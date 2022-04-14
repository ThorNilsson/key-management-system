import React from 'react';
import EventsView from '../view/EventsView';

export default function EventsPresenter(props) {

    /** Sortera alla objekt efter deras datum.
     *  props.keys.sort(function(a, b) {
        return parseFloat(b.time) - parseFloat(a.time);
        });
     */
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

    return (
        <EventsView keys={eventArray(data)}></EventsView>
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
