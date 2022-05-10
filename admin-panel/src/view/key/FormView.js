import React from "react"

import { TextField } from "@mui/material"

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
				id="name"
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
				id="description"
				label="Room description"
				type="text"
				fullWidth
				variant="outlined"
				value={roomDescription}
			/>
			<TextField
				onInput={e => setRoomLongitude(e.target.value)}
				autoFocus
				margin="normal"
				id="longitude"
				label="Longitude"
				type="text"
				fullWidth
				variant="outlined"
				value={roomLongitude}
			/>
			<TextField
				onInput={e => setRoomLatitude(e.target.value)}
				autoFocus
				margin="normal"
				id="latitude"
				label="Latitude"
				type="text"
				fullWidth
				variant="outlined"
				value={roomLatitude}
			/>
			<TextField
				onInput={e => setRoomImage(e.target.value)}
				autoFocus
				margin="normal"
				id="roomImage"
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
				id="roomImage"
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
				id="roomImage"
				label="Default check out time"
				type="text"
				fullWidth
				variant="outlined"
				value={defaultCheckOutTime}
			/>
		</>
	)
}
