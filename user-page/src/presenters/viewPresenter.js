import React, { useEffect, useState, useRef } from 'react';
import BeforeAccess from "./beforeAccessPres";
import StateView from "../views/openBoxView";
import TooFarView from "../views/tooFarView";
import ReturnTimer from './returnTimerPres';
import TooFar from './tooFarPresenter';
import LockIcon from '../outline_lock_black_48dp.png'
import unLockIcon from '../outline_lock_open_black_48dp.png'
import Icon from '../successIcon.png'
import { ref, get, onValue, query, orderByChild, limitToLast, set } from "firebase/database"
import { db } from "../firebase"


function ViewPresenter(props) {
    const [boxState, setBoxState] = useState();
    const [keyState, setKeyState] = useState();
    const [data, setData] = useState();
    const [timeLeft, setTimeLeft] = useState(Date.now());
    const [dist, setDist] = useState();
    const locationWatchId = useRef(null);

    useEffect(() => {
        setInterval(() => setTimeLeft(Date.now()), 3000);
    }, []);

    useEffect(() => {

        /*
          Get the current door status
       */
        const isBoxOpenRef = query(ref(db, 'keyboxes/' + props.keyboxId + '/log'), orderByChild('time'), limitToLast(1));
        onValue(isBoxOpenRef, (snapshot) => {
            const data = snapshot.val();
            console.log('keyboxes/' + props.keyboxId + '/log')
            if (data != null) {
                const keys = Object.keys(data);
                const array = keys.map(key => ({ key: key, value: data[key] }));
                const isOpen = array[0].value.isOpen;
                console.log(isOpen);
                setBoxState(isOpen);
            }
        });
    }, []);

    useEffect(() => {
        const bookingRef = ref(db, 'keyboxes/' + props.keyboxId + '/bookings/' + props.bookingId);
        get(bookingRef).then((snapshot) => {
            console.log(snapshot.val());
            const data = snapshot.val();
            setData({
                startDate: new Date(data.checkIn * 1000),
                returnDate: new Date(data.checkOut * 1000),
                name: data.name,
                message: data.privateMessage,
                keyId: data.keyId
            });
            /*
            Get the current key slot of the key, 0 == not in box, else 1 to 8
         */
            const getKeySlotStatusRef = ref(db, 'keyboxes/' + props.keyboxId + '/keys/' + data.keyId + '/keySlot');
            onValue(getKeySlotStatusRef, (snapshot) => {
                const data = snapshot.val();
                if (data != null) {
                    console.log(data);
                    setKeyState(data);
                }
            });
        }).catch((error) => {
            console.error(error);
        });

        const infoRef = ref(db, 'keyboxes/' + props.keyboxId + '/info');
        get(infoRef).then((snapshot) => {
            console.log(snapshot.val());
            const data = snapshot.val();
            locationWatchId.current = navigator.geolocation.watchPosition((pos) => setDistanceToTarget(pos, data.longitude, data.latitude));

        }).catch((error) => {
            console.error(error);
        });

    }, []);
    function setDistanceToTarget(pos, lng, lat) {
        var crd = pos.coords;
        setDist(Math.round(distance(crd.latitude, crd.longitude, lat, lng) * 1000))
    }


    return (
        <div>
            {!data || !dist || currentView(props.keyboxId, props.bookingId, timeLeft, data, boxState, keyState, dist)}
        </div>
    )
}

function currentView(keyboxId, bookingId, timeLeft, data, boxOpen, keyTaken, dist) {
    if (data.startDate - timeLeft > 0) {
        return (
            <BeforeAccess startTime={data.startDate} />
        )
    }
    if (data.timeUntilReturn > 0) {
        return (
            <ReturnTimer returnTime={data.returnDate} />
        )
    }
    if (dist > 100) {
        return (
            <TooFarView dist={dist} />
        )
    }
    if (!boxOpen && !keyTaken && dist != undefined) {
        //console.log("Box is ready to be opened")
        const topText = `You are ${dist === undefined ? '0' : dist} meters from the box`
        const bottomText = 'Open Box!'

        return (
            <StateView button={true} key='open' action={() => openBox(keyboxId, bookingId, data.name, data.keyId)}
                topText={topText} bottomText={bottomText} icon={LockIcon} />
        )
    }
    if (boxOpen && !keyTaken) {
        //console.log("opened")
        const topText = 'You have opened the box'
        const bottomText = 'Retrieve the indicated key!'
        const overMap = 'Retrieve Key'

        return (
            <StateView key='grabKey' topText={topText} bottomText={bottomText} overMap={overMap} icon={unLockIcon} />
        )
    }
    if (boxOpen && keyTaken) {
        //console.log("key is taken")
        const topText = 'You have retrieved the key'
        const bottomText = 'Please close the door!'
        const overMap = 'Close Door'

        return (
            <StateView key='close' topText={topText} bottomText={bottomText} overMap={overMap} icon={unLockIcon} />
        )
    }
    if (!boxOpen && keyTaken) {
        //console.log("success")
        const topText = `Rental Period ends in ${getTimeUntilReturn(data.returnDate).days} days`
        const bottomText = `Have a great stay! ${data.message}`
        const overMap = 'Success'

        return (
            <StateView key='success' topText={topText} bottomText={bottomText} overMap={overMap} icon={Icon} />
        )
    }

    return <div className='topbar1'><div className='topbar_text2'>Loading...</div></div>
}

function getTimeUntilReturn(returnTime) {
    let difference = returnTime - Date.now();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
        };
    }
    return timeLeft;
}



function openBox(keyboxId, bookingId, nameOnBooking, keyId) {
    set(ref(db, 'keyboxes/' + keyboxId + '/accessingBooking'), {
        accessRequested: parseInt(Date.now() / 1000),
        accessExpired: parseInt(Date.now() / 1000) + 60000,
        bookingId: bookingId,
        name: nameOnBooking,
        keyId: keyId,
        action: "getKeyByBooking",
    });
    console.log("timer started")
}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function distance(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
}


export default ViewPresenter