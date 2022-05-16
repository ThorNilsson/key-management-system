import React, {useEffect, useState} from "react"
import EventsView from "../view/EventsView"
import {useParams} from "react-router-dom"
import {onValue, ref, orderByChild, query, limitToLast} from "firebase/database"
import {db} from "../api/firebase"
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import Tooltip from '@mui/material/Tooltip';

const columns = [
    {field: "id", headerName: "ID", width: 100},
    {field: "index", headerName: "Index", width: 30},
    {
        field: "time", headerName: "Time", width: 100,
        renderCell: (cellValues) => {
            return (
                convertTime(cellValues.row.time)
            );
        }
    },
    {
        field: "isOpen", headerName: "Door Open", width: 75,
        renderCell: (cellValues) => {
            return (
                cellValues.row.isOpen ? <LockOpenIcon/> : <LockIcon/>
            );
        }
    },
    {field: "name", headerName: "User", width: 130},
    {field: "userId", headerName: "User ID", width: 130},
    {field: "bookingId", headerName: "Booking ID", width: 130},
    {
        field: "message", headerName: "Message", width: 400,
        renderCell: (cellValues) => {
            return (
                <Tooltip title={cellValues.row.message} arrow placement="top">
                    <div>{cellValues.row.message}</div>
                </Tooltip>
            );
        }
    },
]

export default function EventsPresenter() {
    const {boxId} = useParams()
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const logsRef = query(ref(db, `keyboxes/${boxId}/log`), orderByChild('time'), limitToLast(100));
        onValue(logsRef, (snapshot) => {
            const data = snapshot.val();
            const events = Object.keys(data).reverse().map((id, index) => ({...data[id], id, index}));
            setEvents(events)
            setLoading(false)
        });
    }, [boxId]);

    return (
        <EventsView
            columns={columns}
            loading={loading}
            rows={events}
        />
    )
}

function convertTime(time) {
    let unix_timestamp = time
    var date = new Date(unix_timestamp * 1000)
    var years = date.getFullYear()
    var months = date.getMonth() + 1
    var days = date.getDate()
    var hours = date.getHours()
    var minutes = "0" + date.getMinutes()
    var seconds = "0" + date.getSeconds()
    var formattedTime =
        days + "/" + months + "-" + years + " " + hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2)
    return formattedTime
}
