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

    const [bookings, setBookings] = useState([])
    const [keys, setKeys] = useState([])
    const [loading, setLoading] = useState(true)
    const [bookingIds, bookingLoading] = useListVals(ref(db, 'guests/' + auth.currentUser.email.replace('.', '')))


    // Fetch bookings
    useEffect(() => {

        if (!bookingLoading) {
            if (bookingIds.length === 0) return setLoading(false)

            const promises = bookingIds.map(id => get(ref(db, "keyboxes/" + id.keyboxId + "/bookings/" + id.bookingId)))
            Promise.all(promises)
                .then(data => {
                    var bookings = (data.map((snap, i) => ({ ...snap.val(), id: bookingIds[i] })))
                    const current = bookings.filter(b => b.checkOut * 1000 - Date.now() >= 0).sort(compare)
                    const expired = bookings.filter(b => b.checkOut * 1000 - Date.now() < 0).sort(compare)
                    setBookings(current.concat(expired))
                    const promises1 = bookings.map(booking => get(ref(db, "keyboxes/" + booking.id.keyboxId + "/keys/" + booking.keyId)))
                    Promise.all(promises1)
                        .then(data => {
                            const keys1 = data.map((snap) => ({ ...snap.val(), id: snap.key }))
                            setKeys(keys1)
                            setLoading(false)
                        })
                        .catch(error => {
                            console.error(error)
                        })
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }, [bookingLoading, bookingIds])


    const logOut = () => {
        signOut(auth)
    }

    return <StartPageView navigate={navigate} bookings={bookings}
        keys={keys} loading={loading} logOut={logOut} bookingLoading={bookingLoading} />
}

function compare(a, b) {
    if (a.checkIn < b.checkIn) {
        return -1;
    }
    if (a.checkIn > b.checkIn) {
        return 1;
    }
    return 0;
}