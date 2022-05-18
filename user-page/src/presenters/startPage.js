import { useState, useEffect } from "react"
import { useListVals } from "react-firebase-hooks/database"
import { ref } from "firebase/database"
import { db } from "../firebase"
import { get } from "firebase/database"
import { getAuth, signOut } from 'firebase/auth';

import { useNavigate } from "react-router-dom"

import StartPageView from "../views/startPageView"

export default function StartPagePresenter() {
    const navigate = useNavigate()
    const auth = getAuth()

    const [currentBookings, setCurrentBookings] = useState([])
    const [expiredBookings, setExpiredBookings] = useState([])
    const [keys, setKeys] = useState([])
    const [bookingsError, setBookingsError] = useState()
    const [loading, setLoading] = useState(true)
    const [bookingIds, bookingLoading, bookingIdsError] = useListVals(ref(db, 'guests/' + auth.currentUser.email.replace('.', '')))


    // Fetch bookings
    useEffect(() => {

        if (!bookingLoading) {
            if (bookingIds.length === 0) return setLoading(false)

            const promises = bookingIds.map(id => get(ref(db, "keyboxes/" + id.keyboxId + "/bookings/" + id.bookingId)))
            Promise.all(promises)
                .then(data => {
                    var bookings = (data.map((snap, i) => ({ ...snap.val(), id: bookingIds[i] })))
                    setCurrentBookings(bookings.filter(b => b.checkOut * 1000 - Date.now() >= 0))
                    setExpiredBookings(bookings.filter(b => b.checkOut * 1000 - Date.now() < 0))
                    const promises1 = bookings.map(booking => get(ref(db, "keyboxes/" + booking.id.keyboxId + "/keys/" + booking.keyId)))
                    Promise.all(promises1)
                        .then(data => {
                            const keys1 = data.map((snap) => ({ ...snap.val(), id: snap.key }))
                            console.log(data[2].val())
                            setKeys(keys1)
                            setLoading(false)
                        })
                        .catch(error => {
                            setBookingsError(error)
                            console.error(error)
                        })
                })
                .catch(error => {
                    setBookingsError(error)
                    console.error(error)
                })
        }
    }, [bookingLoading])


    const logOut = () => {
        signOut(auth)
    }

    return <StartPageView navigate={navigate} currentBookings={currentBookings.sort(compare)} expiredBookings={expiredBookings.sort(compare)}
        keys={keys} loading={loading} logOut={logOut} bookingLoading={bookingLoading} />
}

function compare(a, b) {
    if (a.checkIn < b.checkIn) {
        return -1;
    }
    if (a.checkIn > b.checkIn) {
        return 1;
    }
    // a must be equal to b
    return 0;
}