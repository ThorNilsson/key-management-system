import React, { useEffect, useState, useRef } from 'react';
import StateView from "../views/openBoxView";
import TooFarView from "../views/tooFarView";
import LockIcon from '../outline_lock_black_48dp.png'
import unLockIcon from '../outline_lock_open_black_48dp.png'
import Icon from '../successIcon.png'
import logo from '../logo-box.png'
import { ref, get, onValue, query, orderByChild, limitToLast, set } from "firebase/database"
import { db } from "../firebase"
import { getAuth } from 'firebase/auth';
import TimeUntilPresenter from './timeUntil';
import { CircularProgress, Stack, } from "@mui/material"


function ViewPresenter() {
    const [boxState, setBoxState] = useState();
    const [keyState, setKeyState] = useState();
    const [data, setData] = useState();
    const [boxData, setBoxData] = useState();
    const [timeLeft, setTimeLeft] = useState(Date.now());
    const [dist, setDist] = useState();
    const [keyboxId, setKeyboxId] = useState();
    const [returnStage, setReturnStage] = useState(false);
    const [success, setSuccess] = useState(false);
    const [pressed, setPressed] = useState(false);
    const locationWatchId = useRef(null);
    const { currentUser } = getAuth()
    const bookingId = window.location.href.split('/')[4]


    useEffect(() => {
        setInterval(() => setTimeLeft(Date.now()), 3000);
    }, []);

    useEffect(() => {

        setTimeout(() => (setReturnStage(true), setSuccess(true)), 10000)

        if (pressed) {
            setTimeout(() => (setPressed(false)), 60000)
        }
    }, [pressed]);

    useEffect(() => {
        if (currentUser) {
            get(ref(db, 'guests/' + currentUser.email.replace('.', '') + '/' + bookingId)).then((snapshot) => {
                const data = snapshot.val();
                console.log(data)
                setKeyboxId(data.keyboxId)
            }).catch((error) => {
                console.error(error);
            });
        }
    }, []);

    useEffect(() => {

        /*
          Get the current door status
       */
        const isBoxOpenRef = query(ref(db, 'keyboxes/' + keyboxId + '/log'), orderByChild('time'), limitToLast(1));
        onValue(isBoxOpenRef, (snapshot) => {
            const data = snapshot.val();
            if (data != null) {
                const keys = Object.keys(data);
                const array = keys.map(key => ({ key: key, value: data[key] }));
                const isOpen = array[0].value.isOpen;
                console.log(isOpen);
                setBoxState(isOpen);
            }
        });
    }, [data]);

    useEffect(() => {
        if (keyboxId) {
            const bookingRef = ref(db, 'keyboxes/' + keyboxId + '/bookings/' + bookingId);
            get(bookingRef).then((snapshot) => {
                console.log(snapshot.val());
                const data = snapshot.val();
                setData({
                    startDate: data.checkIn * 1000,
                    returnDate: data.checkOut * 1000,
                    name: data.name,
                    message: data.message,
                    keyId: data.keyId
                });
                /*
                Get the current key slot of the key, 0 == not in box, else 1 to 8
             */
                const getKeySlotStatusRef = ref(db, 'keyboxes/' + keyboxId + '/keys/' + data.keyId + '/keySlot');
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

            const infoRef = ref(db, 'keyboxes/' + keyboxId + '/info');
            get(infoRef).then((snapshot) => {
                console.log(snapshot.val());
                const data = snapshot.val();
                setBoxData({
                    description: data.description
                })
                locationWatchId.current = navigator.geolocation.watchPosition((pos) => setDistanceToTarget(pos, data.longitude, data.latitude),
                    () => console.log("Error"), {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: Infinity
                });

            }).catch((error) => {
                console.error(error);
            });
        }

    }, [keyboxId]);
    function setDistanceToTarget(pos, lng, lat) {
        var crd = pos.coords;
        setDist(Math.round(distance(crd.latitude, crd.longitude, lat, lng) * 1000))
    }

    if (!data || !boxData || !dist) return (<div className='topbar1' >
        <Stack justifyContent="center"
            alignItems="center" height={'100%'}><CircularProgress /></Stack>
    </div>
    )
    if (data.startDate - timeLeft > 0) {
        console.log("no access yet")
        return (
            <TimeUntilPresenter time={data.startDate} return={false} />
        )
    }
    if (dist > 100) {
        return (
            <TooFarView dist={dist} description={boxData.description} />
        )
    }
    if (!boxState && keyState != 0 && dist != undefined && !returnStage) {
        const topText = `You are ${dist === undefined ? '0' : dist} meters from the box`
        const bottomText = 'Open Box!'
        if (!pressed) {
            return (
                <StateView button={true} key='open' action={() => (openBox(keyboxId, bookingId, data.name, data.keyId), setPressed(true))}
                    topText={topText} bottomText={bottomText} icon={LockIcon} />
            )
        } else {
            return (
                <StateView button={false} key='open' pressed={pressed}
                    topText={topText} bottomText={bottomText} icon={LockIcon} />
            )
        }
    }
    if (boxState && keyState != 0 && !returnStage) {
        const topText = 'You have opened the box'
        const bottomText = 'Retrieve the indicated key!'
        const overMap = 'Retrieve Key'

        return (
            <StateView key='grabKey' topText={topText} bottomText={bottomText} overMap={overMap} icon={unLockIcon} />
        )
    }
    if (boxState && keyState === 0 && !returnStage) {
        const topText = 'You have retrieved the key'
        const bottomText = 'Please close the door!'
        const overMap = 'Close Door'

        return (
            <StateView key='close' topText={topText} bottomText={bottomText} overMap={overMap} icon={unLockIcon} />
        )
    }
    if (!boxState && keyState === 0 && !returnStage && !success) {

        const topText = `Welcome ${data.name}, have a great stay! `
        const bottomText = data.message
        const overMap = 'Success'

        return (
            <StateView key='success' topText={topText} bottomText={bottomText} overMap={overMap} icon={Icon} />
        )
    }
    if (success) {
        if (!pressed) {
            return (
                <TimeUntilPresenter time={data.returnDate} return={true}
                    openBox={() => (openBox(keyboxId, bookingId, data.name, data.keyId), setPressed(true))} />
            )
        } else {
            return (
                <TimeUntilPresenter time={data.returnDate} return={true}
                    pressed={pressed} />
            )
        }
    }

    if (returnStage && boxState && keyState === 0) {
        const topText = 'You have opened the box'
        const bottomText = 'Return the indicated key!'
        const overMap = 'Return Key'

        return (
            <StateView key='returnKey' topText={topText} bottomText={bottomText} overMap={overMap} icon={unLockIcon} />
        )
    }

    if (returnStage && boxState && keyState != 0) {
        const topText = 'You have returned the key'
        const bottomText = 'Thank you! Please close the door'
        const overMap = 'Close door'

        return (
            <StateView key='close' topText={topText} bottomText={bottomText} overMap={overMap} icon={unLockIcon} />
        )
    }
    if (returnStage && !boxState && keyState != 0) {
        const topText = 'Well done'
        const bottomText = 'Thank you for using KMS!'
        const overMap = 'Welcome back!'

        return (
            <StateView key='done' topText={topText} bottomText={bottomText} overMap={overMap} icon={logo} />
        )
    }
    return <div className='topbar1'><div className='topbar_text2'>Loading...</div></div>
}



function openBox(keyboxId, bookingId, nameOnBooking, keyId) {
    set(ref(db, 'keyboxes/' + keyboxId + '/accessingBooking'), {
        accessRequested: parseInt(Date.now() / 1000),
        accessExpired: parseInt(Date.now() / 1000) + 60,
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