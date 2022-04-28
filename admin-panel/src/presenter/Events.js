import React from 'react';
import EventsView from '../view/EventsView';

import { useList } from "react-firebase-hooks/database"
import { useParams } from 'react-router-dom';
import { ref } from 'firebase/database';
import { db } from "../api/firebase"


const data = [
    {
        "bookingId": "",
        "isOpen": true,
        "message": "Box opened by nfc.",
        "name": "",
        "time": 1649801029
        ,
        "userId": ""
    },
    {
        "bookingId": "",
        "isOpen": true,
        "message": "Box opened by nfc.",
        "name": "",
        "time": 1649770818,
        "userId": ""
    },
    {
        "bookingId": "",
        "isOpen": true,
        "message": "Box opened by nfc.",
        "name": "",
        "time": 1649800858,
        "userId": ""
    }
]

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'time', headerName: 'Time', width: 130 },
    { field: 'message', headerName: 'Message', width: 130 },
    { field: 'name', headerName: 'User', width: 130 },
    { field: 'userId', headerName: 'User ID', width: 130 },
    { field: 'bookingId', headerName: 'Booking ID', width: 130 },
];

export default function EventsPresenter(props) {

	const { boxId } = useParams()

    const [events, loading, error] = useList(ref(db, `keyboxes/${boxId}/log`))

    if(error) return <div>Something went wrong</div>


    return (
        <EventsView columns={columns} loading={loading} rows={eventArray(events.map(e => ({...e.val(), id: e.key})))}></EventsView>
    )
}

function convertTime(time) {
    let unix_timestamp = time;
    var date = new Date(unix_timestamp * 1000);
    var years = date.getFullYear();
    var months = date.getMonth() + 1;
    var days = date.getDate();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = days + '/' + months + '-' + years + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}

function eventArray(array){
    return array.map((event, index) => {
        event["id"] = index;
        event["time"] = convertTime(event["time"]);
        return event;
    })
}
