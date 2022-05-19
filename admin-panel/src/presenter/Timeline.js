import TimelineView from "../view/TimelineView.js"
import "react-calendar-timeline/lib/Timeline.css"
import moment from "moment"
import { useList } from "react-firebase-hooks/database"
import { onValue, ref, set } from "firebase/database"
import { db } from "../api/firebase.js"
import useTitle from "../hooks/useTitle"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function TimelinePresenter() {
	useTitle("Timeline")
	const { boxId } = useParams()
	const navigate = useNavigate()
	const [bookings, setBookings] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const bookingsRef = ref(db, `keyboxes/${boxId}/bookings`)
		const handleValue = snapshot => {
			const data = snapshot.val()
			const bookings = Object.keys(data).map(id => ({
				id,
				...data[id],
			}))
			setBookings(bookings)
			setLoading(false)
		}
		const unsub = onValue(bookingsRef, handleValue)

		return () => unsub()
	}, [boxId])

	const [keys, loadingKeys, errorKeys] = useList(ref(db, `keyboxes/${boxId}/keys`))

	const [selectedBooking, setSelectedBooking] = useState({})

	if (errorKeys) return <div>Something went wrong</div>

	const groups = keys
		.map(key => ({ ...key.val(), id: key.key }))
		.map(({ name, id }) => ({
			id,
			title: name,
		}))

	const items = bookings.map(b => ({
		...b,
		group: b.keyId,
		title: b.message,
		start_time: moment(b.checkIn * 1000),
		end_time: moment(b.checkOut * 1000),
	}))

	const handleBookingMove = (bookingId, newStartTime, key) => {
		let confirmAction = window.confirm("Please confirm you want to change the date of this booking.")
		if (!confirmAction) {
			return
		}

		const booking = items.find(booking => booking.id === bookingId)

		const checkIn = new moment(newStartTime)
			.set({
				hour: booking.start_time.hour(),
				minute: booking.start_time.minute(),
			})
			.unix()

		const checkOut = new moment(checkIn * 1000)
			.add(booking.end_time.diff(booking.start_time, "minute"), "minute")
			.set({
				hour: booking.end_time.hour(),
				minute: booking.end_time.minute(),
			})
			.unix()

		const updatedBooking = {
			checkIn: checkIn,
			checkOut: checkOut,
			email: booking.email,
			keyId: key.id,
			message: booking.message,
			name: booking.title,
		}
		console.log(booking)
		console.log(updatedBooking)
		console.log({
			1: new Date(booking.checkIn * 1000).toString(),
			2: new Date(booking.checkOut * 1000).toString(),
			3: new Date(updatedBooking.checkIn * 1000).toString(),
			4: new Date(updatedBooking.checkOut * 1000).toString(),
		})

		set(ref(db, "keyboxes/" + boxId + "/bookings/" + bookingId), updatedBooking)
			.then(() => {})
			.catch(error => alert("Something went wrong " + error.message))
	}

	const handleViewBooking = id => {
		if (id) return navigate(`/${boxId}/bookings/${id}`)
		navigate(`/${boxId}/bookings/${selectedBooking.id}`)
	}

	const handleDeSelectingBooking = () => {
		setSelectedBooking({})
	}

	const handleSelectingBooking = itemId => {
		let sel = items.find(booking => booking.id === itemId)
		setSelectedBooking({
			...sel,
			start_time: sel.start_time.format("hh:mm"),
			end_time: sel.end_time.format("hh:mm"),
		})
	}

	const handleNewBooking = (keyId, time) => {
		const startDate = time

		console.log({ keyId, startDate })
		navigate(`/${boxId}/booking/new`)
	}

	return (
		<TimelineView
			groups={groups}
			items={items}
			loading={loading || loadingKeys}
			selectedBooking={selectedBooking}
			handleBookingMove={handleBookingMove}
			handleSelectingBooking={handleSelectingBooking}
			handleNewBooking={handleNewBooking}
			handleViewBooking={handleViewBooking}
			handleDeSelectingBooking={handleDeSelectingBooking}
		/>
	)
}
