
import BookingsView from '../view/bookingsView';
import { useList } from "react-firebase-hooks/database"
import { useParams } from 'react-router-dom';
import { ref } from 'firebase/database';
import { db } from "../api/firebase"

export default function BookingsPresenter() {
	const { boxId } = useParams()

    const [bookings, loading, error] = useList(ref(db, `keyboxes/${boxId}/bookings`))

    if(error) return <div>Something went wrong</div>

    console.log(bookings)

    return (
        <BookingsView columns={columns} loading={loading} rows={bookings.map(b => ({...b.val(), id: b.key}))}/>
    )
}


const columns = [
    { field: 'id', headerName: 'Key ID', width: 200 },
    /* { field: 'room', headerName: 'Room', width: 70 }, */
    { field: 'checkIn', headerName: 'Check in', width: 130 },
    { field: 'checkOut', headerName: 'Check out', width: 130 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'role', headerName: 'Role', width: 70 },
    { field: 'privateMessage', headerName: 'Message', width: 500 },
    { field: 'url', headerName: 'Link', width: 400 },
];
