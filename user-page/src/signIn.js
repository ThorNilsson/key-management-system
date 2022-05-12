import { getAuth, isSignInWithEmailLink, signInWithEmailLink, setPersistence, browserSessionPersistence } from "firebase/auth";
import { ref, get, onValue, child, query, orderByChild, limitToLast } from "firebase/database"
import { db } from "./firebase"

export function signIn(keyboxId, bookingId, setState) {
    // Confirm the link is a sign-in with email link.
    const auth = getAuth();
    console.log(auth)
    console.log(auth.currentUser)
    let bookingEmail = null;

    
    if (!auth.currentUser) {
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.prompt('Please provide your email for confirmation, you have 5 tries');
            console.log(bookingId)
            const bookingRef = ref(db, 'keyboxes/' + keyboxId + '/bookings/' + bookingId);
            get(bookingRef).then((snapshot) => {
                const data = snapshot.val();
                bookingEmail = data.email;
                let counter = 4;
                while (email != bookingEmail && counter > 0) {
                    email = window.prompt('Please provide your email for confirmation, you have ' + counter + ' tries left');
                    console.log(email)
                    console.log(bookingEmail)
                    counter--;
                }
                if (email != bookingEmail) {
                    console.log("idiot")
                    setState(false)
                }
                setPersistence(auth, browserSessionPersistence).then(()=> {
                    setState(true)
                    return signInWithEmailLink(auth, email, window.location.href)
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
            }).catch((error) => {
                console.error(error);
            });
        }
    } else {
        //return true;
        setState(true)
    }
}