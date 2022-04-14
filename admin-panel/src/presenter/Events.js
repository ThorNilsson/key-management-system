import React from 'react';
import EventsView from './EventsView';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase, ref, onValue } from "firebase/database";

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
        <EventsView keys={data}></EventsView>
    )
}

function fetchData() {
    let keys = null;
    const firebaseConfig = {
        apiKey: "AIzaSyAUsPBPy1B5cr_U0xeB1xPU8T_7S-x_dyg",
        authDomain: "key-management-system-40057.firebaseapp.com",
        databaseURL: "https://key-management-system-40057-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "key-management-system-40057",
        storageBucket: "key-management-system-40057.appspot.com",
        messagingSenderId: "818193873576",
        appId: "1:818193873576:web:2e3c62dffff7d584f7a09d"
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    const logs = ref(db, 'keyboxes/dkgC3kfhLpkKBysY_C-9/log');
    onValue(logs, (snapshot) => {
        const data = snapshot.val();
        keys = Object.values(data);
        keys.sort(function (a, b) {
            return parseFloat(b.time) - parseFloat(a.time);
        });
        console.log(keys);
        return keys;
    });
}