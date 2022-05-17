import { useState, useEffect } from "react"
import { useListVals } from "react-firebase-hooks/database"
import { ref } from "firebase/database"
import { db } from "../firebase"
import { get } from "firebase/database"
import { getAuth,signOut } from 'firebase/auth';

import { useNavigate } from "react-router-dom"

import StartPageView from "../views/startPageView"
import loadingGif from '../Loading_icon.gif'
//import useTitle from "../hooks/useTitle"

export default function StartPagePresenter() {
    //useTitle("Start page")
	//const navigate = useNavigate()
	const auth = getAuth()

	const [bookings, setBookings] = useState([])
    const [bookingsError, setBookingsError] = useState()
    const [loading, setLoading] = useState(true)
    const [bookingIds, bookingLoading, bookingIdsError] = useListVals(ref(db, 'guests/' + auth.currentUser.email.replace('.','')))
    

	// Fetch bookings
	useEffect(() => {
		
        if(bookingIds.length === 0) return setLoading(false)

		const promises = bookingIds.map(id => get(ref(db, "keyboxes/" + id.keyboxId + "/bookings/" + id.bookingId)))
		Promise.all(promises)
			.then(data => {
                var bookings = (data.map((snap, i) => ({ ...snap.val(), id: bookingIds[i] })))
                setBookings(bookings)
                bookings.map(booking => get(ref(db, "keyboxes/" + id.keyboxId + "/bookings/" + id.bookingId)))
                setLoading(false)
            })
			.catch(error => {
                setBookingsError(error)
                console.error(error)
            })
        
	}, [bookingLoading])

    //if (loading || bookingLoading) return <img src={loadingGif}></img>
    

    const logOut = () => {
        signOut(auth)
    }

	return <StartPageView navigate={''} bookings={bookings} loading={loading} logOut={logOut} bookingLoading={bookingLoading}/>
}