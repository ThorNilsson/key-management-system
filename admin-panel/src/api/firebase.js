import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
	apiKey: "AIzaSyAUsPBPy1B5cr_U0xeB1xPU8T_7S-x_dyg",
	authDomain: "key-management-system-40057.firebaseapp.com",
	databaseURL: "https://key-management-system-40057-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "key-management-system-40057",
	storageBucket: "key-management-system-40057.appspot.com",
	messagingSenderId: "818193873576",
	appId: "1:818193873576:web:2e3c62dffff7d584f7a09d",
}

initializeApp(firebaseConfig)

export const db = getDatabase()
