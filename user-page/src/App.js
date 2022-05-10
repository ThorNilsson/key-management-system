import './App.css';
import React, {useRef, useEffect, useState} from 'react';
import Base from './presenters/basePresenter'
import Model from './model';
import ViewPresenter from './presenters/viewPresenter';
import { useList } from "react-firebase-hooks/database"
import { ref, get, onValue, child, query, orderByChild, limitToLast } from "firebase/database"
import { db } from "./firebase"
import loadingGif from './Loading_icon.gif'


import BeforeAccess from './presenters/beforeAccessPres';

//import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
    //http://localhost:3000/asodiaouio29186ey7gawd
    const [loaded, setLoaded] = useState(false)

    const [bookingId, setBookingId] = useState();
    const [keyboxId, setKeyboxId] = useState();

    //let model = new Model();

    useEffect(() => {
      const starCountRef = ref(db, 'links/' + window.location.pathname.split('/')[1]);
        get(starCountRef).then((snapshot) => {
          const data = snapshot.val();
          setKeyboxId(data.keyboxId);
          setBookingId(data.bookingId);
        }).catch((error) => {
          console.error(error);
      });
    }, []);
  
    if(!bookingId || !keyboxId) return <img src={loadingGif}></img>;
    return (
        <div>
            <Base keyboxId={keyboxId}/>
            <ViewPresenter keyboxId={keyboxId} bookingId={bookingId}/>
        </div>
    )
}


export default App;
