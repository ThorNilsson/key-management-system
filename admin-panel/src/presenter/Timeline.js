import TimelineView from "../view/TimelineView.js"

import "react-calendar-timeline/lib/Timeline.css"
import moment from "moment"

import {useList} from "react-firebase-hooks/database"
import {push, ref, set} from "firebase/database"
import {db} from "../api/firebase.js"

import {useNavigate, useParams} from "react-router-dom"
import {getHours, getMinutes, setHours, setMinutes} from "date-fns";
import {useState} from "react";

export default function TimelinePresenter() {
    const {boxId} = useParams()
    const navigate = useNavigate()

    const [bookings, loadingBookings, errorBookings] = useList(ref(db, `keyboxes/${boxId}/bookings`))
    const [keys, loadingKeys, errorKeys] = useList(ref(db, `keyboxes/${boxId}/keys`))

    const [selectedBooking, setSelectedBooking] = useState({});


    if (errorBookings || errorKeys) return <div>Something went wrong</div>

    const groups = keys
        .map(key => ({...key.val(), id: key.key}))
        .map(({name, id}) => ({
            id,
            title: name,
        }))


    const items = bookings
        .map(booking => ({...booking.val(), id: booking.key}))
        .map(({id, keyId, checkIn, checkOut, name, email, message}) => ({
            id,
            group: keyId,
            title: name,
            start_time: moment(checkIn * 1000),
            end_time: moment(checkOut * 1000),
            email,
            message,
        }))

    const handleBookingMove = (bookingId, newStartTime, key) => {
        const booking = items.find(booking => booking.id === bookingId);

        const updatedBooking = {
            checkIn: new moment(newStartTime).set({
                hour: booking.start_time.hour(),
                minute: booking.start_time.minute()
            }).unix(),
            checkOut: new moment(newStartTime).add(booking.end_time.diff(booking.start_time, 'days'), "day").set({
                hour: booking.end_time.hour(),
                minute: booking.end_time.minute()
            }).unix(),
            email: booking.email,
            keyId: key.id,
            message: booking.message,
            name: booking.title,
        };

        set(ref(db, "keyboxes/" + boxId + "/bookings/" + bookingId), updatedBooking)
            .then(() => {
            })
            .catch(error => alert("Something went wrong " + error.message))
    }

    const handleSelectingBooking = (itemId) => {
        let sel = items.find(booking => booking.id === itemId);
        setSelectedBooking({
            ...sel,
            start_time: sel.start_time.format("hh:mm"),
            end_time: sel.end_time.format("hh:mm"),
        });
    }

    const handleNewBooking = (keyId, time) => {
        const startDate = time;

        console.log({keyId,startDate})
        navigate(`/${boxId}/new-booking`);
    }

    console.log(items)

    return <TimelineView groups={groups} items={items} loading={loadingBookings || loadingKeys}
                         handleBookingMove={handleBookingMove} selectedBooking={selectedBooking}
                         handleSelectingBooking={handleSelectingBooking} handleNewBooking={handleNewBooking}/>
}
