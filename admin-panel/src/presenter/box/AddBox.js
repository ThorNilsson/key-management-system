import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Container  from "@mui/material/Container"
import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import { getAuth } from "firebase/auth"
import { ref, set } from "firebase/database"
import { db } from "../../api/firebase"
import { useState } from "react"
import ArrowBackIosNewRounded from "@mui/icons-material/ArrowBackIosNewRounded"
import { useNavigate } from "react-router-dom"

export default function AddBoxPresenter() {
	const auth = getAuth()
	const navigate = useNavigate()
	const [boxId, setBoxId] = useState("")
	const handleSubmit = () => {
		set(ref(db, "users/" + auth.currentUser.uid + "/boxes/" + boxId), boxId)
			.then(() => navigate("/" + boxId))
			.catch(error => alert("Something went wrong " + error.message))
	}

	return (
		<Container maxWidth="xs">
			<Button onClick={() => navigate("/")} variant="text" startIcon={<ArrowBackIosNewRounded />}>
				Back
			</Button>
			<Typography variant="h2" sx={{ mt: 3 }}>
				Add new box
			</Typography>
			<TextField
				onInput={e => setBoxId(e.target.value)}
				autoFocus
				margin="normal"
				id="boxId"
				label="Box ID"
				type="text"
				fullWidth
				variant="outlined"
				value={boxId}
				required
			/>
			<Button variant="contained" onClick={handleSubmit} sx={{ mr: 2 }}>
				Add Box
			</Button>
		</Container>
	)
}
