import BookingsView from "../view/bookingsView"
import {useList} from "react-firebase-hooks/database"
import {useParams} from "react-router-dom"
import {ref, get} from "firebase/database"
import {useState, useEffect} from "react"
import {db} from "../api/firebase"
import Button from "@mui/material/Button"
import useRelativeNavigation from "../hooks/useRelativeNavigation"
import useTitle from "../hooks/useTitle"
import {format, formatDistanceToNow, isPast, isToday} from "date-fns";
import moment from "moment";
import Chip from "@mui/material/Chip";

export default function BookingsPresenter() {
    useTitle("View bookings")
    const {boxId} = useParams()
    const relativeNavigate = useRelativeNavigation()

    const [bookings, loading, error] = useList(ref(db, `keyboxes/${boxId}/bookings`))
    const [keyInfo, setKeyInfo] = useState({})
    const [showPrevious, setShowPrevious] = useState(false)
    const [populatedBookings, setPopulatedBookings] = useState([])

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

    useEffect(() => {
        setPopulatedBookings(bookings
            .map(b => ({...b.val(), id: b.key})).filter(b => showPrevious ? true : b.checkOut > moment().unix())
            .map(b => ({
                ...b,
                room: keyInfo[b.keyId]?.name,
            })))
    }, [showPrevious, bookings, keyInfo])

    if (error) return <div>Something went wrong</div>

    const handleView = id => relativeNavigate(id)

    const columns = [
        {field: "id", headerName: "Booking id", minWidth: 50, flex: 2},
        {
            field: "checkIn",
            headerName: "Check-in",
            width: 150,
            renderCell: cellValues => format(new Date(cellValues.row.checkIn * 1000), "yy-MM-dd HH:mm:ss"),
        },
        {
            field: "checkOut",
            headerName: "Check-out",
            width: 150,
            hide: true,
            renderCell: cellValues => format(new Date(cellValues.row.checkOut * 1000), "yy-MM-dd HH:mm:ss"),
        },
        {
            field: "checkInDays",
            headerName: "Check-in status",
            width: 200,
            hide: false,
            sortable: false,
            renderCell: cellValues => {
                const checkIn = new Date(cellValues.row.checkIn * 1000)
                return <Chip label={isPast(checkIn) ? formatDistanceToNow(checkIn) +" ago" : "In " + formatDistanceToNow(checkIn)} variant="outlined"
                             color={isToday(checkIn) ? "success" : isPast(checkIn) ? "error" : "default"}/>
            }
        },
        {
            field: "nrOfDays",
            headerName: "Duration",
            width: 150,
            hide: true,
            renderCell: cellValues => moment(moment(cellValues.row.checkIn * 1000).diff(moment(cellValues.row.checkOut * 1000))).day() + ' days',
        },
        {field: "room", headerName: "Room", minWidth: 150, flex: 1},
        {field: "name", headerName: "Name", minWidth: 130, flex: 2},
        {field: "email", headerName: "Email", minWidth: 130, flex: 2, hide: true},
        {field: "message", headerName: "Message", minWidth: 130, flex: 2, hide: true},
        {
            field: "editDelete",
            headerName: "",
            minWidth: 80,
            flex: 1,
            sortable: false,
            renderCell: rowData => <Button onClick={() => handleView(rowData.id)}>View</Button>,
        },
    ]

    return <BookingsView columns={columns} loading={loading} rows={populatedBookings}
                         handleShowPrevious={setShowPrevious} showPrevious={showPrevious}/>
}
