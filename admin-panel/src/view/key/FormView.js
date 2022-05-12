import React from "react"

import { TextField, Typography } from "@mui/material"
import LocationPicker from "../../components/LocationPicker"

export default function KeyFormView({
	roomName,
	setRoomName,
	roomDescription,
	setRoomDescription,
	roomLongitude,
	setRoomLongitude,
	roomLatitude,
	setRoomLatitude,
	roomImage,
	setRoomImage,
	defaultCheckInTime,
	setDefaultCheckInTime,
	defaultCheckOutTime,
	setDefaultCheckOutTime,
}) {
	return (
		<>
			<TextField
				onInput={e => setRoomName(e.target.value)}
				autoFocus
				margin="normal"
				label="Room name"
				type="text"
				fullWidth
				variant="outlined"
				value={roomName}
			/>
			<TextField
				onInput={e => setRoomDescription(e.target.value)}
				autoFocus
				margin="normal"
				label="Room description"
				type="text"
				fullWidth
				variant="outlined"
				value={roomDescription}
			/>
			<TextField
				onInput={e => setRoomImage(e.target.value)}
				autoFocus
				margin="normal"
				label="Image url"
				type="text"
				fullWidth
				variant="outlined"
				value={roomImage}
			/>
			<TextField
				onInput={e => setDefaultCheckInTime(e.target.value)}
				autoFocus
				margin="normal"
				label="Default check in time"
				type="text"
				fullWidth
				variant="outlined"
				value={defaultCheckInTime}
			/>
			<TextField
				onInput={e => setDefaultCheckOutTime(e.target.value)}
				autoFocus
				margin="normal"
				label="Default check out time"
				type="text"
				fullWidth
				variant="outlined"
				value={defaultCheckOutTime}
			/>
            <Typography variant="h5">Pick location of room</Typography>
			<LocationPicker
				lng={roomLongitude}
				lat={roomLatitude}
				setLng={setRoomLongitude}
				setLat={setRoomLatitude}
				sx={{ mb: 3, mt: 1 }}
			/>
		</>
	)
}
