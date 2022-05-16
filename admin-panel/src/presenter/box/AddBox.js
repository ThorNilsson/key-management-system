import BoxPopupHeader from "../../components/BoxPopupHeader"
import * as React from "react"
import {
	TextField,
	MenuItem,
	Button,
	DialogContent,
	DialogActions,
	Typography,
	Stack,
	Paper,
	Container,
} from "@mui/material"
import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import LocationPicker from "../../components/LocationPicker"
import { getAuth } from "firebase/auth"
import { push, ref, set } from "firebase/database"
import { db } from "../../api/firebase"
import { useState } from "react"
import { ArrowBackIosNewRounded } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

export default function AddBoxPresenter() {
	const auth = getAuth()
	const navigate = useNavigate()
	const [boxId, setBoxId] = useState()
	const handleSubmit = () => {
		set(ref(db, "users/" + auth.currentUser.uid + "/boxes/" + boxId), boxId)
			.then(() => navigate("/" + boxId))
			.catch(error => alert("Something went wrong " + error.message))
	}

	return (
		<Container maxWidth="xs">
            <Button onClick={() => navigate("/")} variant="text" startIcon={<ArrowBackIosNewRounded />}>Back</Button>
            <Typography variant="h2" sx={{mt: 3}}>Add new box</Typography>
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
