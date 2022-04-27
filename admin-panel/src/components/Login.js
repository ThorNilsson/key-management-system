import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"

export default function Login() {
    const [mail, setMail] = useState("")
    const [pass, setPass] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        if(mail === "" || pass === "") return

        const auth = getAuth()

        signInWithEmailAndPassword(auth, mail, pass)
			.catch(error => {
				const errorCode = error.code
				const errorMessage = error.message
				console.log(errorCode, errorMessage)
			})
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={e => setMail(e.target.value)} value={mail} />
            <input type="text" onChange={e => setPass(e.target.value)} value={pass} />
            <input type="submit" />
        </form>
    )
}