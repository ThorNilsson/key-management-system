import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

function RegisterView(props) {

    return (
        <div>
        </div>
    );
}

function createUser(email, password) {

    var auth = getAuth();

    const passwordErrorMessage = document.getElementById(
        "error-message-password"
    );
    const emailErrorMessage = document.getElementById(
        "error-message-email"
    );
    const termsAndConditionsErrorMessage = document.getElementById(
        "error-message-checkbox"
    );

    termsAndConditionsErrorMessage.style.opacity = 0;
    emailErrorMessage.style.opacity = 0;
    passwordErrorMessage.style.opacity = 0;

    if ((document.getElementById("checkbox").checked)) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                this.user = userCredential.user;
                (async () => {
                    try {
                        const profile = ["", "", "", ""];
                        // await setDoc(doc(db, "users", this.user.uid), {
                        // });
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }
                })();
            })
            .catch((error) => {
                switch (error.code) {
                    case "auth/missing-email":
                        emailErrorMessage.style.opacity = 1;
                        emailErrorMessage.innerHTML = "Email is required.";
                        break;
                    case "auth/invalid-email":
                        emailErrorMessage.style.opacity = 1;
                        emailErrorMessage.innerHTML = "Email is invalid.";
                        break;
                    case "auth/email-already-in-use":
                        emailErrorMessage.style.opacity = 1;
                        emailErrorMessage.innerHTML = "Email already in use!";
                        break;
                    case "auth/weak-password":
                        passwordErrorMessage.style.opacity = 1;
                        passwordErrorMessage.innerHTML =
                            "Password not strong enough. A password containing a combination of 6 numbers and/or letters required.";
                        break;
                    case "auth/internal-error":
                        passwordErrorMessage.style.opacity = 1;
                        passwordErrorMessage.innerHTML =
                            "Password is required.";
                        break;
                    default:
                        passwordErrorMessage.style.opacity = 1;
                        passwordErrorMessage.innerHTML = "Unknown error.";
                        break;
                }
            });
    }
    else{
        termsAndConditionsErrorMessage.style.opacity = 1;
        termsAndConditionsErrorMessage.innerHTML = 
            "Terms and Conditions need to be accepted to create an account."
    }
}


export default RegisterView;
