import {useState, useEffect} from "react"

import { db } from "../../api/firebase"

import { onValue, set, ref } from "firebase/database"
import { useParams } from "react-router-dom"
import useTitle from "../../hooks/useTitle"

import EditBookingView from "../../view/booking/EditView"


let lastReadData

export default function EditBookingPresenter() {
	useTitle("Edit Booking")
	const { boxId, bookingId } = useParams()
	const [checkIn, setCheckIn] = useState("")
	const [checkOut, setCheckOut] = useState("")
	const [email, setEmail] = useState("")
	const [keyId, setKeyId] = useState("")
	const [message, setMessage] = useState("")
	const [name, setName] = useState("")
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const bookingRef = ref(db, `keyboxes/${boxId}/bookings/${bookingId}`)
		const handleValue = snapshot => {
			const data = snapshot.val()
			setCheckIn(data.checkIn)
			setCheckOut(data.checkOut)
			setEmail(data.email)
			setKeyId(data.keyId)
			setMessage(data.message)
			setName(data.name)
			setLoading(false)
			lastReadData = data
		}
		const unsub = onValue(bookingRef, handleValue)

		return unsub
	}, [boxId, bookingId])

	const save = () => {
		const bookingRef = ref(db, `keyboxes/${boxId}/bookings/${bookingId}`)

		set(bookingRef, {
			...lastReadData,
			checkIn,
			checkOut,
			email,
			keyId,
			message,
			name,
		})
			.then(() => {
				/* navigate(`/${boxId}`) */
			})
			.catch(error => alert("Something went wrong " + error.message))
	}
	return (
		<EditBookingView
            save={save}
            loading={loading}
			checkIn={checkIn}
			checkOut={checkOut}
			email={email}
			message={message}
			name={name}
			setCheckIn={setCheckIn}
			setCheckOut={setCheckOut}
			setEmail={setEmail}
			setMessage={setMessage}
			setName={setName}
		/>
	)
}
