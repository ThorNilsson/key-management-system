import './App.css';
import React, {useRef, useEffect, useState} from 'react';
import Base from './presenters/basePresenter'
import Model from './model';
import ViewPresenter from './presenters/viewPresenter';


import {useList} from "react-firebase-hooks/database"
import {ref, get, onValue, child, query, orderByChild, limitToLast} from "firebase/database"
import {db} from "./firebase"

import BeforeAccess from './presenters/beforeAccessPres';

//import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
    //http://localhost:3000/asodiaouio29186ey7gawd

    var pathArray = window.location.pathname.split('/');
    let model = new Model(pathArray);


    useEffect(() => {

        /*
          Get the current door status
       */
        const isBoxOpenRef = query(ref(db, 'keyboxes/' + "dkgC3kfhLpkKBysY_C-9" + '/log'), orderByChild('time'), limitToLast(1));

        onValue(isBoxOpenRef, (snapshot) => {
            const data = snapshot.val();
            if (data != null) {
                const keys = Object.keys(data);
                const array = keys.map(key => ({key: key, value: data[key]}));
                const isOpen = array[0].value.isOpen;
                console.log(isOpen);
            }
        });

        /*
            Get the current key slot of the key, 0 == not in box, else 1 to 8
         */
        const getKeySlotStatusRef = ref(db, 'keyboxes/' + "dkgC3kfhLpkKBysY_C-9" + '/keys/' + '24213714427' + '/keySlot');
        onValue(getKeySlotStatusRef, (snapshot) => {
            const data = snapshot.val();
            if (data != null) {
                console.log(data);
            }
        });


    }, []);


    return (
        <div>
            <Base model={model}/>
            <ViewPresenter model={model}/>
        </div>
    )
}


export default App;
