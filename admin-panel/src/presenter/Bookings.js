import BookingsView from "../view/bookingsView"
import { useList } from "react-firebase-hooks/database"
import { useParams } from "react-router-dom"
import { ref, get } from "firebase/database"
import { useState, useEffect } from "react"
import { db } from "../api/firebase"

export default function BookingsPresenter() {
	const { boxId } = useParams()

	const [bookings, loading, error] = useList(ref(db, `keyboxes/${boxId}/bookings`))
	const [keyInfo, setKeyInfo] = useState({})

	useEffect(() => {
		if (!bookings || bookings.length === 0) return

		const keysBooked = [...new Set(bookings.map(booking => booking.val().keyId))]

        const promises = keysBooked.map(keyId => get(ref(db, `keyboxes/${boxId}/keys/${keyId}`)))

		Promise.all(promises)
			.then(keys => {
                setKeyInfo(keys.reduce((acc, key, index) => ({...acc, [keysBooked[index]]: key.val()}), {}))
            })
			.catch(error => console.error(error))
	}, [bookings, boxId])

	if (error) return <div>Something went wrong</div>

    const populatedBookings = bookings
        .map(b => ({ ...b.val(), id: b.key, }))
        .map(b => ({...b, room: keyInfo[b.keyId]?.name }))


	return <BookingsView columns={columns} loading={loading} rows={populatedBookings} />
}

const columns = [
	{ field: "id", headerName: "Booking id", width: 200 },
	{ field: 'room', headerName: 'Room', width: 70 },
	{ field: "checkIn", headerName: "Check in", width: 130 },
	{ field: "checkOut", headerName: "Check out", width: 130 },
	{ field: "name", headerName: "Name", width: 130 },
	{ field: "role", headerName: "Role", width: 70 },
	{ field: "privateMessage", headerName: "Message", width: 500 },
	{ field: "url", headerName: "Link", width: 400 },
]
