import BookingsView from "../view/bookingsView"
import { useList } from "react-firebase-hooks/database"
import { useParams } from "react-router-dom"
import { ref, get } from "firebase/database"
import { useState, useEffect } from "react"
import { db } from "../api/firebase"
import Button from "@mui/material/Button"
import useRelativeNavigation from "../hooks/useRelativeNavigation"
import useTitle from "../hooks/useTitle"

export default function BookingsPresenter() {
	useTitle("View bookings")
	const { boxId } = useParams()
	const relativeNavigate = useRelativeNavigation()

	const [bookings, loading, error] = useList(ref(db, `keyboxes/${boxId}/bookings`))
	const [keyInfo, setKeyInfo] = useState({})

	useEffect(() => {
		if (!bookings || bookings.length === 0) return

		const keysBooked = [...new Set(bookings.map(booking => booking.val().keyId))]

		const promises = keysBooked.map(keyId => get(ref(db, `keyboxes/${boxId}/keys/${keyId}`)))

		Promise.all(promises)
			.then(keys => {
				setKeyInfo(keys.reduce((acc, key, index) => ({ ...acc, [keysBooked[index]]: key.val() }), {}))
			})
			.catch(error => console.error(error))
	}, [bookings, boxId])

	if (error) return <div>Something went wrong</div>

	const populatedBookings = bookings
		.map(b => ({ ...b.val(), id: b.key }))
		.map(b => ({ ...b, room: keyInfo[b.keyId]?.name }))

	const handleView = id => relativeNavigate(id)

	const columns = [
		{ field: "id", headerName: "Booking id", minWidth: 150, flex: 2 },
		{ field: "room", headerName: "Room", minWidth: 70, flex: 1 },
		{ field: "name", headerName: "Name", minWidth: 130, flex: 2 },
		{
			field: "editDelete",
			headerName: "",
			minWidth: 80,
			flex: 1,
			sortable: false,
			renderCell: rowData => <Button onClick={() => handleView(rowData.id)}>View</Button>,
		},
	]

	return <BookingsView columns={columns} loading={loading} rows={populatedBookings} />
}
