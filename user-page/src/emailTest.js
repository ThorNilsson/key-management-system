import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
export function emailTest() {
    const email = "keymanagementsystemKMS@gmail.com"
    const auth = getAuth();
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
// Dynamic Links will start with https://ica-scraper.web.app