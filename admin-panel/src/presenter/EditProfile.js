import { getAuth } from "firebase/auth"
import { useState } from "react"
import { EmailAuthProvider } from "firebase/auth"

import { reauthenticateWithCredential } from "firebase/auth"
import { useNavigate } from "react-router-dom"

import EditProfileView from "../view/EditProfileView"

import { updateEmail } from "firebase/auth"
import { sendEmailVerification } from "firebase/auth"
import { updatePassword } from "firebase/auth"
import { deleteUser } from "firebase/auth"
import { set } from "firebase/database"
import { db } from "../api/firebase"
import { ref } from "firebase/database"
import useTitle from "../hooks/useTitle"

export default function EditProfilePresenter() {
    useTitle("Edit profile")
	const auth = getAuth()
	const navigate = useNavigate()

	const [newUsername, setNewUsername] = useState("")
	const [newEmail, setNewEmail] = useState("")

	const [oldPassword, setOldPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [newRepeatPassword, setNewRepeatPassword] = useState("")

	const handleUpdateUsername = () => {
		if (newUsername.length < 3) return alert("username must be longer")
		const usernameRef = ref(db, `users/${auth.currentUser.uid}/username`)
		set(usernameRef, newUsername)
		setNewUsername("")
	}

	const handleUpdateEmail = () => {
		updateEmail(auth.currentUser, newEmail)
			.then(() => {
				setNewEmail("")
				alert("Update successfull")
			})
			.catch(error => {
				alert("Could not update email")
				console.error(error)
			})
	}

	const handleVerifyEmail = () => {
		sendEmailVerification(auth.currentUser).then(() => {
			alert("A mail will be sent to your inbox shortly!")
		})
	}

	const handleUpdatePassword = () => {
		if (newPassword !== newRepeatPassword) return alert("Repeated password does not match new password")
		const credentials = EmailAuthProvider.credential(auth.currentUser.email, oldPassword)
		reauthenticateWithCredential(auth.currentUser, credentials)
			.then(() => {
				updatePassword(auth.currentUser, newPassword)
					.then(() => {
						alert("Password updated!")
						setOldPassword("")
						setNewPassword("")
						setNewRepeatPassword("")
					})
					.catch(error => {
						alert("Something went wrong" + error.message)
						console.error(error)
					})
			})
			.catch(error => {
				alert("Something went wrong" + error.message)
				console.error(error)
			})
	}

	const handleDeleteAccount = () => {
		const credentials = EmailAuthProvider.credential(auth.currentUser.email, oldPassword)
		reauthenticateWithCredential(auth.currentUser, credentials)
			.then(() => {
				deleteUser(auth.currentUser)
					.then(() => {
						alert("ACcount successfully deleted")
						navigate("/")
					})
					.catch(error => {
						alert("Something went wrong" + error.message)
						console.error(error)
					})
			})
			.catch(error => {
				alert("Something went wrong" + error.message)
				console.error(error)
			})
	}

    console.log(auth.currentUser)

	return (
		<EditProfileView
            user={auth.currentUser}
			handleUpdateUsername={handleUpdateUsername}
			handleUpdateEmail={handleUpdateEmail}
			handleVerifyEmail={handleVerifyEmail}
			handleUpdatePassword={handleUpdatePassword}
			handleDeleteAccount={handleDeleteAccount}
			newUsername={newUsername}
			newEmail={newEmail}
			oldPassword={oldPassword}
			newPassword={newPassword}
			newRepeatPassword={newRepeatPassword}
			setNewUsername={setNewUsername}
			setNewEmail={setNewEmail}
			setOldPassword={setOldPassword}
			setNewPassword={setNewPassword}
			setNewRepeatPassword={setNewRepeatPassword}
		/>
	)
}
