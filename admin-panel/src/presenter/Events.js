import React, { useEffect, useState } from "react"
import EventsView from "../view/EventsView"
import { useParams } from "react-router-dom"
import { onValue, ref, orderByChild, query, limitToLast, set } from "firebase/database"
import { db } from "../api/firebase"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import LockIcon from "@mui/icons-material/Lock"
import Tooltip from "@mui/material/Tooltip"
import { format } from "date-fns"

import useTitle from "../hooks/useTitle"

const columns = [
	{ field: "id", headerName: "ID", width: 120 },
	{ field: "index", headerName: "Index", width: 30 },
	{
		field: "time",
		headerName: "Time",
		width: 120,
		renderCell: cellValues => format(new Date(cellValues.row.time * 1000), "yy-MM-dd HH:mm:ss"),
	},
	{
		field: "isOpen",
		headerName: "Door Open",
		width: 75,
		renderCell: cellValues => {
			return cellValues.row.isOpen ? <LockOpenIcon /> : <LockIcon />
		},
	},
	{ field: "name", headerName: "User", width: 130 },
	{ field: "userId", headerName: "User ID", width: 130 },
	{ field: "bookingId", headerName: "Booking ID", width: 130 },
	{
		field: "message",
		headerName: "Message",
		width: 400,
		renderCell: cellValues => {
			return (
				<Tooltip title={cellValues.row.message} arrow placement="top">
					<div>{cellValues.row.message}</div>
				</Tooltip>
			)
		},
	},
]

export default function EventsPresenter() {
	useTitle("Event log")
	const { boxId } = useParams()
	const [events, setEvents] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const logsRef = query(ref(db, `keyboxes/${boxId}/log`), orderByChild("time"), limitToLast(100))
		onValue(logsRef, snapshot => {
			const data = snapshot.val()
			const events = Object.keys(data)
				.reverse()
				.map((id, index) => ({ ...data[id], id, index }))
			setEvents(events)
			setLoading(false)
		})
	}, [boxId])

	const handleEventsDelete = () => {
		let confirmAction = window.confirm("Please confirm that you want to delete all events.")
		if (confirmAction) {
			set(ref(db, "keyboxes/" + boxId + "/log"), {})
				.then(() => {
					setLoading(true)
				})
				.catch(error => alert("Something went wrong " + error.message))
		} else {
			alert("Canceled")
		}
	}

	return <EventsView columns={columns} loading={loading} rows={events} handleEventsDelete={handleEventsDelete} />
}
