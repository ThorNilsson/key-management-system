import React, { useState } from 'react';
import Base from './basePresenter'
import ViewPresenter from './viewPresenter';
import { ref, get } from "firebase/database"
import { db } from "../firebase"
import loadingGif from '../Loading_icon.gif'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, sendSignInLinkToEmail, signOut } from 'firebase/auth';
import { LoginView } from '../views/loginView';
import StartPagePresenter from './startPage';
export function LoginPresenter() {
    //http://localhost:3000/asodiaouio29186ey7gawd
    //const email = "keymanagementsystemKMS@gmail.com"
    const [loaded, setLoaded] = useState(false)
    const [email, setEmail] = useState();
    const [bookingEmail, setBookingEmail] = useState();
    const [bookingId, setBookingId] = useState();
    const [keyboxId, setKeyboxId] = useState();
    const [counter, setCounter] = useState(5);
    const [loginDisable, setLoginDisable] = useState();
    const [errorText, setErrorText] = useState("");
    const auth = getAuth()
    const [user, loading, error] = useAuthState(auth)

    const handleSubmit = event => {
        event.preventDefault()
        logIn()
    }

    if (loading) return <img src={loadingGif}></img>


    if (user) {
        console.log(user)
        const logOut = () => {
            signOut(auth)
        }
        const starCountRef = ref(db, 'guests/' + auth.currentUser.email.replace('.',''));
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
                {/* <Base keyboxId={keyboxId} logOut={logOut} />
                <ViewPresenter keyboxId={keyboxId} bookingId={bookingId} /> */}
                <StartPagePresenter/>
            </div>
        )
    }

    const logIn = () => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
            signInWithEmailLink(auth, email, window.location.href).then(data => {
                console.log(data)
            }).catch(error => {
                console.log(error.code)
                console.log(counter)
                if (error.code === 'auth/invalid-email') {
                    if (counter === 0) {
                        setErrorText("Too many tries, send a new link and try again")
                        setLoginDisable(true);
                        return;
                    } else {
                        setErrorText("Email is not correct")
                        setCounter(counter - 1)
                    }
                }
            })
        } else {
            setErrorText("Not a correct link, send a new link and try again")
            setLoginDisable(true);
        }
    }

    const sendEmail = (event) => {
        event.preventDefault()
        const actionCodeSettings = {
            url: 'http://localhost:3000/asodiaouio29186ey7gawd',
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
        <LoginView logIn={logIn} loginDisable={loginDisable} sendEmail={sendEmail}
            setEmail={setEmail} emailErrorText={errorText} handleSubmit={handleSubmit}
        />
    )
}