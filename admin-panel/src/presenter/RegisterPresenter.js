import { useState } from "react"
import RegisterView from "../view/RegisterView"
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	setPersistence,
	browserLocalPersistence,
	browserSessionPersistence,
	sendPasswordResetEmail,
} from "firebase/auth"
import { db } from "../api/firebase"
import { ref, set } from "firebase/database"

export default function RegisterPresenter() {
	const auth = getAuth()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [username, setUsername] = useState("")

	const [emailErrorText, setEmailErrorText] = useState("")
	const [passwordErrorText, setPasswordErrorText] = useState("")

	const [remember, setRemember] = useState(false)
	const [shouldLogin, setLoginState] = useState(false)

	const handleSubmit = event => {
		event.preventDefault()
		setEmailErrorText("")
		setPasswordErrorText("")

		const usedPersistance = remember ? browserLocalPersistence : browserSessionPersistence

		if (email === "") return setEmailErrorText("Enter your email")
		if (password === "") return setPasswordErrorText("Enter your password")

		setPersistence(auth, usedPersistance)
			.then(() => (shouldLogin ? signIn() : signUp()))
			.catch(error => alert("Something went wrong " + error.message))
	}

	const signIn = () => {
		signInWithEmailAndPassword(auth, email, password).catch(error => {
			switch (error.code) {
				case "auth/wrong-password":
					return setPasswordErrorText("Wrong password")
				case "auth/user-not-found":
					return setEmailErrorText("No user with that email")
				case "auth/invalid-email":
					return setEmailErrorText("Invalid email")
				default:
					alert(error.message)
			}
		})
	}

	const signUp = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(userCredentials => {
				console.log(userCredentials)
				set(ref(db, "users/" + userCredentials.user.uid), {
					username: username,
					email: email,
				}).catch(error => alert("Something went wrong " + error.message))
			})
			.catch(error => {
				switch (error.code) {
					case "auth/missing-email":
						setEmailErrorText("Email Required")
						break
					case "auth/invalid-email":
						setEmailErrorText("Email is Invalid")
						break
					case "auth/email-already-in-use":
						setEmailErrorText("Email already in use")
						break
					case "auth/weak-password":
						setPasswordErrorText(
							"Password not strong enough. A password containing a combination of 6 numbers and/or letters required."
						)
						break
					case "auth/internal-error":
						setPasswordErrorText("Password required")
						break
					default:
						setPasswordErrorText("Unknown Error")
						break
				}
				console.log(error)
			})
	}

    const forgotPassword = () => {
        const email = prompt("Enter your email")
        sendPasswordResetEmail(auth, email)
            .then(() => alert(`A mail has been sent to ${email}...`))
            .catch(error => alert("something went wrong" + error.message))
    }

	return (
		<RegisterView
			email={email}
			setEmail={setEmail}
			password={password}
			setPassword={setPassword}
			username={username}
			setUsername={setUsername}
			emailErrorText={emailErrorText}
			setEmailErrorText={setEmailErrorText}
			passwordErrorText={passwordErrorText}
			setPasswordErrorText={setPasswordErrorText}
			handleSubmit={handleSubmit}
			shouldLogin={shouldLogin}
			setLoginState={setLoginState}
			remember={remember}
			setRemember={setRemember}
            forgotPassword={forgotPassword}
		/>
	)
}
