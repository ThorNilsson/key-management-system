import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import Base from './presenters/basePresenter'
import Model from './model';
import ViewPresenter from './presenters/viewPresenter';
import { useList } from "react-firebase-hooks/database"
import { ref, get, onValue, child, query, orderByChild, limitToLast } from "firebase/database"
import { db } from "./firebase"
import loadingGif from './Loading_icon.gif'
import idiotSandwich from './idiot sandwich.jpeg'


import BeforeAccess from './presenters/beforeAccessPres';
import { emailTest } from './emailTest';
import { signIn } from './signIn';
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, sendSignInLinkToEmail, signOut } from 'firebase/auth';


//import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  //http://localhost:3000/asodiaouio29186ey7gawd
  //const email = "keymanagementsystemKMS@gmail.com"
  const [loaded, setLoaded] = useState(false)
  const [email, setEmail] = useState();

  const [bookingId, setBookingId] = useState();
  const [keyboxId, setKeyboxId] = useState();
  const [loggedIn, setLoggedIn] = useState();
  const auth = getAuth()
  const [user, loading, error] = useAuthState(auth)
  let emailSent = false;

  if (loading) return <img src={loadingGif}></img>


  if (user) {
    console.log(user)
    const logOut = () => {
      signOut(auth)
    }
    //return <div>Logged in as {user.email} <button onClick={logOut}>Sign out</button></div>
    const starCountRef = ref(db, 'links/' + window.location.pathname.split('/')[1]);
    console.log(window.location.pathname.split('/')[1])
    get(starCountRef).then((snapshot) => {
      const data = snapshot.val();
      console.log(data)
      setKeyboxId(data.keyboxId);
      setBookingId(data.bookingId);
    }).catch((error) => {
      console.error(error);
    });
    console.log(bookingId)
    return (!bookingId ||
      <div>
        <Base keyboxId={keyboxId} logOut={logOut}/>
        <ViewPresenter keyboxId={keyboxId} bookingId={bookingId} />
      </div>
    )
  }

  const logIn = () => {
    signInWithEmailLink(auth, email, window.location.href).then(data => {
      alert("Success")
      console.log(data)
    }).catch(error => {
      alert("No success")
      console.log(error)
    })
  }

  const sendEmail = () => {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: 'http://localhost:3000/asodiaouio29186ey7gawd',
      // This must be true.
      handleCodeInApp: true,
    };
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        console.log("email sent")
      })
      .catch((error) => {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  }

  return (
    <div>Not logged in
      <input onInput={(e) => setEmail(e.target.value)}></input>
      <button onClick={logIn}>Login</button>
      <button onClick={sendEmail}>Send email</button>
    </div>
  )


  //let model = new Model();

  /*   useEffect(() => {
    console.log(emailSent)
    if (!emailSent && window.location.href === 'http://localhost:3000/asodiaouio29186ey7gawd') {
      emailTest();
      }
      const starCountRef = ref(db, 'links/' + window.location.pathname.split('/')[1]);
      get(starCountRef).then((snapshot) => {
        const data = snapshot.val();
        setKeyboxId(data.keyboxId);
      setBookingId(data.bookingId);
        signIn(data.keyboxId, data.bookingId, setLoggedIn);
      }).catch((error) => {
        console.error(error);
      });
    emailSent = true;
  }, [emailSent]);

  console.log(loggedIn)
  if (loggedIn === undefined) {
    return <img src={loadingGif}></img>;
  } else if (!loggedIn) {
    return <img src={idiotSandwich}></img>;
  } else {
    return (
      <div>
        <Base keyboxId={keyboxId} />
        <ViewPresenter keyboxId={keyboxId} bookingId={bookingId} />
      </div>
    )

  } */
  return <img src={loadingGif}></img>;
}


export default App;
