import { useState, useEffect, useRef, useMemo } from "react"

import { useList } from "react-firebase-hooks/database"

import { db } from "../../api/firebase"

import { onValue, set, ref } from "firebase/database"
import { useParams } from "react-router-dom"
import useTitle from "../../hooks/useTitle"

import { addDays, getHours, setHours, getMinutes, setMinutes } from "date-fns"

import EditBookingView from "../../view/booking/EditView"
import useRelativeNavigation from "../../hooks/useRelativeNavigation"
import BookingFormView from "../../view/booking/FormView"

let lastReadData

export default function EditBookingPresenter() {
	useTitle("Edit Booking")

	const { boxId, bookingId } = useParams()
	const relativeNavigate = useRelativeNavigation()

	const formRef = useRef()
	const [checkIn, setCheckIn] = useState(new Date())
	const [checkInTime, setCheckInTime] = useState(new Date())
	const [checkOut, setCheckOut] = useState(new Date())
	const [checkOutTime, setCheckOutTime] = useState(new Date())
	const [email, setEmail] = useState("")
	const [room, setRoom] = useState("")
	const [message, setMessage] = useState("")
	const [name, setName] = useState("")
	const [loading, setLoading] = useState(true)

	const [dateRange, setDateRange] = useState({
		startDate: new Date(),
		endDate: addDays(new Date(), 0),
		key: "selection",
	})

	const [keys, keysLoading, error] = useList(ref(db, `keyboxes/${boxId}/keys`))
	const keyVals = useMemo(() => keys.map(key => ({ ...key.val(), id: key.key })), [keys])

	useEffect(() => {
		const bookingRef = ref(db, `keyboxes/${boxId}/bookings/${bookingId}`)
		const handleValue = snapshot => {
			const data = snapshot.val()
			const checkInDate = new Date(data.checkIn * 1000)
			const checkOutDate = new Date(data.checkOut * 1000)
			setCheckIn(checkInDate)
			setCheckOut(checkOutDate)
			setDateRange({
				startDate: checkInDate,
				endDate: checkOutDate,
				key: "selection",
			})
			setEmail(data.email)
			setRoom(data.keyId)
			setMessage(data.message)
			setName(data.name)
			setLoading(false)
			lastReadData = data
		}
		const unsub = onValue(bookingRef, handleValue)

		return unsub
	}, [boxId, bookingId])

	const updateTimesBasedOnKey = keyId => {
		setRoom(keyId)
		const key = keyVals.find(key => key.id === keyId)
		setCheckInTime(new Date(`2022-01-01 ${key.defaultCheckInTime}`))
		setCheckOutTime(new Date(`2022-01-01 ${key.defaultCheckOutTime}`))
	}

	const handleSubmit = e => {
		e.preventDefault()
		let checkedIn = setHours(checkIn, getHours(checkInTime))
		checkedIn = setMinutes(checkedIn, getMinutes(checkInTime))

		let checkedOut = setHours(checkOut, getHours(checkOutTime))
		checkedOut = setMinutes(checkedOut, getMinutes(checkOutTime))

		const checkedInUnix = parseInt((checkedIn.getTime() / 1000).toFixed(0))
		const checkedOutUnix = parseInt((checkedOut.getTime() / 1000).toFixed(0))

		set(ref(db, "keyboxes/" + boxId + "/bookings/" + bookingId), {
			...lastReadData,
			name,
			email,
			message,
			keyId: room,
			checkIn: checkedInUnix,
			checkOut: checkedOutUnix,
		})
			.then(() => relativeNavigate("../"))
			.catch(error => alert("Something went wrong " + error.message))
	}

	if (error) return <div>Something went wrong</div>

	return (
		<EditBookingView
			loading={loading || keysLoading}
			close={() => relativeNavigate("../../")}
			back={() => relativeNavigate("../")}
			name={name}
			formRef={formRef}
		>
			<BookingFormView
				keys={keyVals}
				handleSubmit={handleSubmit}
				setCheckIn={setCheckIn}
				checkInTime={checkInTime}
				setCheckInTime={setCheckInTime}
				setCheckOut={setCheckOut}
				checkOutTime={checkOutTime}
				setCheckOutTime={setCheckOutTime}
				email={email}
				setEmail={setEmail}
				room={room}
				setRoom={updateTimesBasedOnKey}
				message={message}
				setMessage={setMessage}
				name={name}
				setName={setName}
				dateRange={dateRange}
				setDateRange={setDateRange}
				formRef={formRef}
			/>
		</EditBookingView>
	)
}
