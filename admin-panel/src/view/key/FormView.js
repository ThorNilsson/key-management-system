import React from "react"

import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import LocationPicker from "../../components/LocationPicker"

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import frLocale from "date-fns/locale/fr"

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
				fullWidth
				multiline
				minRows={3}
				margin="dense"
				label="Room description"
				type="text"
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
			<Stack direction="row" spacing={2} sx={{ my: 2 }}>
				<LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
					<TimePicker
						label="Default check in time"
						value={defaultCheckInTime}
						onChange={setDefaultCheckInTime}
						renderInput={params => <TextField fullWidth {...params} />}
					/>
					<TimePicker
						label="Default check out time"
						value={defaultCheckOutTime}
						onChange={setDefaultCheckOutTime}
						renderInput={params => <TextField fullWidth {...params} />}
					/>
				</LocalizationProvider>
			</Stack>
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
