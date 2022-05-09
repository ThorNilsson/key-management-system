import TimelineView from "../view/TimelineView.js"

import "react-calendar-timeline/lib/Timeline.css"
import moment from "moment"

import { useList } from "react-firebase-hooks/database"
import { ref } from "firebase/database"
import { db } from "../api/firebase.js"

import { useParams } from "react-router-dom"

export default function TimelinePresenter() {
	const { boxId } = useParams()

	const [bookings, loadingBookings, errorBookings] = useList(ref(db, `keyboxes/${boxId}/bookings`))
	const [keys, loadingKeys, errorKeys] = useList(ref(db, `keyboxes/${boxId}/keys`))

	if (errorBookings || errorKeys) return <div>Something went wrong</div>

	const groups = keys
		.map(key => ({ ...key.val(), id: key.key }))
		.map(({ name, id }) => ({
			id,
			title: name,
		}))
        
	const items = bookings
		.map(booking => ({ ...booking.val(), id: booking.key }))
		.map(({ id, keyId, checkIn, checkOut }) => ({
			id,
			group: keyId,
			start_time: moment(checkIn),
			end_time: moment(checkOut),
			canMove: false,
		}))

	console.log(items)

	return <TimelineView groups={groups} items={items} loading={loadingBookings || loadingKeys} />
}
