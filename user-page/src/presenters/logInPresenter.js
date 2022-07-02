import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, sendSignInLinkToEmail } from 'firebase/auth';
import { LoginView } from '../views/loginView';
import StartPagePresenter from './startPage';
import { CircularProgress, Stack, } from "@mui/material"
import { useNavigate } from "react-router-dom"

export function LoginPresenter() {
    const [email, setEmail] = useState();
    const [counter, setCounter] = useState(5);
    const [loginDisable, setLoginDisable] = useState();
    const [errorText, setErrorText] = useState("");
    const auth = getAuth()
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()


    const handleSubmit = event => {
        event.preventDefault()
        logIn()
    }

    if (loading) return (
        <div className='topbar1' >
            <Stack justifyContent="center" alignItems="center" height={'100%'}>
                <CircularProgress id='loading'/>
            </Stack>
        </div>
    )
    if (error) return <div>{error.message}</div>


    if (user) {
        navigate(`/startpage`)
        return (
            <div>
                <StartPagePresenter />
            </div>
        )
    }

    const logIn = () => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
            signInWithEmailLink(auth, email, window.location.href).then(() => {
            }).catch(error => {
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
            url: 'https://kms-access-key.netlify.app/login',
            //url: 'https://localhost:3001/login',
            handleCodeInApp: true,
        };

        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                console.log("email sent")
            })
            .catch((error) => {
                if (error.code === 'auth/missing-email') {
                    setErrorText("Missing email")
                }
                console.log(error)
            });
    }

    return (
        <LoginView logIn={logIn} loginDisable={loginDisable} sendEmail={sendEmail}
            setEmail={setEmail} emailErrorText={errorText} handleSubmit={handleSubmit}
        />
    )
}
