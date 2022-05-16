import { getAuth } from "firebase/auth"
import { useState, useEffect } from "react"
import { useListVals } from "react-firebase-hooks/database"
import { ref } from "firebase/database"
import { db } from "../firebase"
import { get } from "firebase/database"

import { useNavigate } from "react-router-dom"

import StartPageView from "../views/startPageView"
//import useTitle from "../hooks/useTitle"

export default function StartPagePresenter() {
    //useTitle("Start page")
	//const navigate = useNavigate()
	const { currentUser } = getAuth()

	const [bookings, setBookings] = useState([])
    const [bookingsError, setBookingsError] = useState()
    const [loading, setLoading] = useState(true)

	// Fetch bookings
	useEffect(() => {
        //const bookingRef = ref(db, 'guests/' + currentUser.email);
        const bookingRef = ref(db, 'guests/' + 'asodiaouio29186ey7gawd');

        get(bookingRef).then((snapshot) => {
            console.log(snapshot.val());
            const data = snapshot.val();
        })
		
        // if(boxIds.length === 0) return setLoading(false)

		// const promises = bookingIds.map(id => get(ref(db, "keyboxes/" + id + "/info")))
		// Promise.all(promises)
		// 	.then(data => {
        //         setBookings(data.map((snap, i) => ({ ...snap.val(), id: bookingIds[i] })))
        //         setLoading(false)
        //     })
		// 	.catch(error => {
        //         setBoxesError(error)
        //         console.error(error)
        //     })
	}, [])

    // if(bookingsIdsError || bookingsError) return <div>Something went wrong</div>


	return <StartPageView navigate={''} bookings={bookings} loading={loading} />
}