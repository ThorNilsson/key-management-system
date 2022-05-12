import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file

import { useState, useEffect, useMemo } from "react"
import { addDays, getHours, setHours, getMinutes, setMinutes } from "date-fns"
import { useList } from "react-firebase-hooks/database"

import { db } from "../api/firebase"
import { ref, get, set, push, onValue } from "firebase/database"
import { resolvePath, useParams, useNavigate } from "react-router-dom"

import NewBookingView from "../view/NewBookingView"
import { KeyboardSharp } from "@mui/icons-material"

export default function NewBookingPresenter() {
	const { boxId } = useParams()
	const navigate = useNavigate()

	const [checkIn, setCheckIn] = useState(new Date(Date.now()))
	const [checkInTime, setCheckInTime] = useState(new Date("2022-01-01 12:00"))
	const [checkOut, setCheckOut] = useState(new Date(Date.now()))
	const [checkOutTime, setCheckOutTime] = useState(new Date("2022-01-01 11:00"))
	const [email, setEmail] = useState("")
	const [room, setRoom] = useState("")
	const [message, setMessage] = useState("")
	const [name, setName] = useState("")

	const [dateRange, setDateRange] = useState({
		startDate: new Date(),
		endDate: addDays(new Date(), 0),
		key: "selection",
	})

	const [keys, loading, error] = useList(ref(db, `keyboxes/${boxId}/keys`))
    const keyVals = useMemo(() => keys.map(key => ({ ...key.val(), id: key.key })), [keys])

	if (error) return <div>Something went wrong loading keys</div>

    const updateTimesBasedOnKey = keyId => {
        setRoom(keyId)
        const key = keyVals.find(key => key.id === keyId)

        setCheckInTime(new Date(`2022-01-01 ${key.defaultCheckInTime}`))
        setCheckOutTime(new Date(`2022-01-01 ${key.defaultCheckOutTime}`))
    }
	const handleSubmit = () => {
		let checkedIn = setHours(checkIn, getHours(checkInTime))
		checkedIn = setMinutes(checkedIn, getMinutes(checkInTime))

		let checkedOut = setHours(checkOut, getHours(checkOutTime))
		checkedOut = setMinutes(checkedOut, getMinutes(checkOutTime))

		const checkedInUnix = parseInt((checkedIn.getTime() / 1000).toFixed(0))
		const checkedOutUnix = parseInt((checkedOut.getTime() / 1000).toFixed(0))

		push(ref(db, "keyboxes/" + boxId + "/bookings/"), {
			name: name,
			email: email,
			message: message,
			keyId: room,
			checkIn: checkedInUnix,
			checkOut: checkedOutUnix,
		})
			.then(() => navigate("/" + boxId + "/bookings"))
			.catch(error => alert("Something went wrong " + error.message))
	}

	return (
		<NewBookingView
			keys={keyVals}
			loading={loading}
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
            close={() => navigate(`/${boxId}`)}
		/>
	)
}
