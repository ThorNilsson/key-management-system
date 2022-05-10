import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Key } from "@mui/icons-material"
import { db } from "../api/firebase"
import { ref, get, set, push, onValue } from "firebase/database"
import { useParams } from "react-router-dom"

export default function PopupKeyForm() {
	const [open, setOpen] = React.useState(false)
	const [roomName, setRoomName] = React.useState("")
	const [roomDescription, setRoomDescription] = React.useState("")
	const [roomLongitude, setRoomLongitude] = React.useState("")
	const [roomLatitude, setRoomLatitude] = React.useState("")
	const [roomKeySlot, setRoomKeySlot] = React.useState("")
	const [roomImage, setRoomImage] = React.useState("")
	const { boxId } = useParams()
	const [uid, setUid] = React.useState("")
	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleScan = () => {
		set(ref(db, "keyboxes/" + boxId + "/accessingBooking/"), {
			action: "getUid",
		})
			.then(() => {
				const actionRef = ref(db, "keyboxes/" + boxId + "/accessingBooking/status")
				onValue(actionRef, snapshot => {
					const data = snapshot.val()
					if (data === "tag sent") {
						const uidRef = ref(db, "keyboxes/" + boxId + "/accessingBooking/uid")
						get(uidRef).then(snapshot => {
							setUid(snapshot.val())
						})
					}
				})
			})
			.catch(error => alert("Something went wrong " + error.message))
	}
	const handleClose = () => {
		setOpen(false)
	}

	const handleSubmit = () => {
		set(ref(db, "keyboxes/" + boxId + "/keys/" + uid), {
			name: roomName,
			description: roomDescription,
			longitude: roomLongitude,
			latitude: roomLatitude,
			preferredKeySlot: roomKeySlot,
			image: roomImage,
			defaultCheckInTime: "12:00",
			defaultCheckOutTime: "11:00",
			keySlot: 0,
		}).catch(error => alert("Something went wrong " + error.message))
		handleClose()
	}

	return (
		<div>
			<Button variant="outlined" size="small" endIcon={<Key />} onClick={handleClickOpen}>
				Add new key
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add key</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To add a new key, click the big blue button, followed by scanning your key tag
					</DialogContentText>
					<p></p>
					<Button onClick={handleScan} variant="contained" component="label">
						Click for scan
					</Button>
					<div>{uid}</div>
					<p></p>
					<TextField
						onInput={e => setRoomName(e.target.value)}
						autoFocus
						margin="dense"
						id="name"
						label="Room name*"
						type="text"
						fullWidth
						variant="standard"
						value={roomName}
					/>
					<TextField
						onInput={e => setRoomDescription(e.target.value)}
						autoFocus
						margin="dense"
						id="description"
						label="Room description"
						type="text"
						fullWidth
						variant="standard"
						value={roomDescription}
					/>
					<TextField
						onInput={e => setRoomLongitude(e.target.value)}
						autoFocus
						margin="dense"
						id="longitude"
						label="Longitude*"
						type="text"
						fullWidth
						variant="standard"
						value={roomLongitude}
					/>
					<TextField
						onInput={e => setRoomLatitude(e.target.value)}
						autoFocus
						margin="dense"
						id="latitude"
						label="Latitude*"
						type="text"
						fullWidth
						variant="standard"
						value={roomLatitude}
					/>
					<TextField
						onInput={e => setRoomKeySlot(e.target.value)}
						autoFocus
						margin="dense"
						id="keySlot"
						label="KeySlot*"
						type="text"
						fullWidth
						variant="standard"
						value={roomKeySlot}
					/>
					<TextField
						onInput={e => setRoomImage(e.target.value)}
						autoFocus
						margin="dense"
						id="roomImage"
						label="IMG URL"
						type="text"
						fullWidth
						variant="standard"
						value={roomImage}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit}>Submit</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
