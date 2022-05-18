import { onValue, ref, set } from "firebase/database"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../../api/firebase"
import format from "date-fns/format"
import BookingView from "../../view/booking/BookingView"
import useRelativeNavigation from "../../hooks/useRelativeNavigation"

export default function ViewBookingPresenter() {
	const { boxId, bookingId } = useParams()
	const relativeNavigate = useRelativeNavigation()

	const [loading, setLoading] = useState(true)
	const [booking, setBooking] = useState()

	useEffect(() => {
		const bookingRef = ref(db, `keyboxes/${boxId}/bookings/${bookingId}`)
		const unSub = onValue(bookingRef, snapshot => {
			const data = snapshot.val()
			setBooking({
				...data,
				checkIn: format(new Date(data.checkIn * 1000), "yy-MM-dd HH:mm"),
				checkOut: format(new Date(data.checkOut * 1000), "yy-MM-dd HH:mm"),
			})
			setLoading(false)
		})

		return unSub
	}, [boxId, bookingId])

	const deleteBooking = () => {
		if (window.confirm("Are you sure?")) {
			set(ref(db, "keyboxes/" + boxId + "/bookings/" + bookingId), null)
				.then(() => relativeNavigate("../"))
				.catch(error => alert("Something went wrong " + error.message))
		}
	}

	return (
		<BookingView
			loading={loading}
			booking={booking}
			deleteBooking={deleteBooking}
			close={() => relativeNavigate("../")}
            edit={() => relativeNavigate("edit")}
		/>
	)
}
