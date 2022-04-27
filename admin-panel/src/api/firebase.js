import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"

const firebaseConfig = {
	apiKey: "AIzaSyAUsPBPy1B5cr_U0xeB1xPU8T_7S-x_dyg",
	authDomain: "key-management-system-40057.firebaseapp.com",
	databaseURL: "https://key-management-system-40057-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "key-management-system-40057",
	storageBucket: "key-management-system-40057.appspot.com",
	messagingSenderId: "818193873576",
	appId: "1:818193873576:web:2e3c62dffff7d584f7a09d",
}

const app = initializeApp(firebaseConfig)

export const db = getDatabase()

/* const auth = getAuth(app) */

/* onAuthStateChanged(auth, user => {
	if (user) {
        console.log(user)
		const uid = user.uid
		console.log(uid)
	} else {
		const email = "kalle@elmdahl.se"
		const password = "test123"

		signInWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				console.log(userCredential)
			})
			.catch(error => {
				const errorCode = error.code
				const errorMessage = error.message
				console.log(errorCode, errorMessage)
			})
	}
})
 */