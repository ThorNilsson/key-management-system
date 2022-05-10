import './App.css';
import React, {useRef, useEffect, useState} from 'react';
import Base from './presenters/basePresenter'
import Model from './model';
import ViewPresenter from './presenters/viewPresenter';


import {useList} from "react-firebase-hooks/database"
import {ref, get, onValue} from "firebase/database"
import {db} from "./firebase"

import BeforeAccess from './presenters/beforeAccessPres';

//import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
    //http://localhost:3000/asodiaouio29186ey7gawd
    var pathArray = window.location.pathname.split('/');


    let model = new Model();
    //console.log(model);

    // const [booking, setBooking] = useState(null);

    // useEffect(() => {
    //     onValue(starCountRef, (snapshot) => {
    //         const data = snapshot.val();
    //         setBooking(data);
    //         console.log(booking);
    //     });
    // }, [])


    return (
        <div>
            <Base model={model}/>
            <ViewPresenter model={model}/>
        </div>
    )
}


export default App;
