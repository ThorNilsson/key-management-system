import React, { useState } from 'react';
import Base from './basePresenter'
import ViewPresenter from './viewPresenter';
import { ref, get } from "firebase/database"
import { db } from "../firebase"
import loadingGif from '../Loading_icon.gif'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, sendSignInLinkToEmail, signOut } from 'firebase/auth';
export function LoginPresenter() {
    //http://localhost:3000/asodiaouio29186ey7gawd
    //const email = "keymanagementsystemKMS@gmail.com"
    const [loaded, setLoaded] = useState(false)
    const [email, setEmail] = useState();

    const [bookingId, setBookingId] = useState();
    const [keyboxId, setKeyboxId] = useState();
    const [counter, setCounter] = useState(5);
    const [loginDisable, setLoginDisable] = useState(false);
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
                <Base keyboxId={keyboxId} logOut={logOut} />
                <ViewPresenter keyboxId={keyboxId} bookingId={bookingId} />
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
                        alert("Too many tries, send a new link and try again")
                        setLoginDisable(true);
                        return;
                    } else {
                        alert("Email is not correct")
                        setCounter(counter - 1)
                    }
                }
            })
        } else {
            alert("Not a correct link, send a new link and try again")
            setLoginDisable(true);
        }
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
            <button onClick={logIn} disabled={loginDisable}>Login</button>
            <button onClick={sendEmail}>Send email</button>
        </div>
    )
}