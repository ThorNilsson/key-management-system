import BoxPopupHeader from "../../components/BoxPopupHeader"
import * as React from "react"
import { TextField, MenuItem, Button, DialogContent, DialogActions, Typography, Stack, Paper } from "@mui/material"
import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import LocationPicker from "../../components/LocationPicker"

import { CircularProgress } from "@mui/material"

const AVAILABLE_COLORS = [
	{
		name: "gray",
		hex: "9C9C9C",
	},
	{
		name: "Red",
		hex: "#DA1A1A",
	},
	{
		name: "Blue",
		hex: "#3920F0",
	},
	{
		name: "Green",
		hex: "#32a852",
	},
	{
		name: "Yellow",
		hex: "#FDF928",
	},
	{
		name: "Purple",
		hex: "#873CAB",
	},
	{
		name: "Pink",
		hex: "#FB80BA",
	},
	{
		name: "Brown",
		hex: "#3F361E",
	},
	{
		name: "Black",
		hex: "#000000",
	},
]

export default function EditBoxView({
	close,
	name,
	setName,
	color,
	setColor,
	description,
	setDescription,
	image,
	setImage,
	latitude,
	setLatitude,
	longitude,
	setLongitude,
	keySlots,
	setKeySlots,
	handleSubmit,
	loading,
}) {
	return (
		<>
			<BoxPopupHeader title={`Update information about ${name} keybox`} close={close} />
			{loading ? (
				<CircularProgress />
			) : (
				<>
					<DialogContent>
						<TextField
							onInput={e => setName(e.target.value)}
							autoFocus
							margin="normal"
							id="name"
							label="Box name"
							type="text"
							fullWidth
							variant="outlined"
							value={name}
							required
						/>
                        <TextField
                            margin="normal"
                            select
                            fullWidth
                            variant="outlined"
                            label="Color"
                            value={color}
                            onChange={e => setColor(e.target.value)}
                        >
                            {AVAILABLE_COLORS.map(({ name, hex }) => (
                                <MenuItem value={hex}>
                                    <Stack direction={"row"} sx={{ width: "100%" }} justifyContent="space-between">
                                        {name} <Paper sx={{ backgroundColor: hex, width: 20, height: 20 }} />
                                    </Stack>
                                </MenuItem>
                            ))}
                        </TextField>
						<TextField
							onInput={e => setDescription(e.target.value)}
							autoFocus
							margin="normal"
							id="description"
							label="Box description"
							type="text"
							fullWidth
							variant="outlined"
							value={description}
							required
						/>
						<TextField
							onInput={e => setImage(e.target.value)}
							autoFocus
							margin="normal"
							label="Box image link"
							type="text"
							fullWidth
							variant="outlined"
							value={image}
							required
						/>
						<TextField
							onInput={e => setKeySlots(Number(e.target.value))}
							autoFocus
							margin="normal"
							label="Number of keyslots"
							type="text"
							fullWidth
							variant="outlined"
							value={keySlots}
							required
						/>
						<Typography variant="h5">Pick location of box</Typography>
						<LocationPicker
							lng={longitude}
							lat={latitude}
							setLng={setLongitude}
							setLat={setLatitude}
							sx={{ mb: 3, mt: 1 }}
						/>
					</DialogContent>
					<DialogActions>
						<Button variant="contained" onClick={handleSubmit}>
							Confirm changes{" "}
						</Button>
					</DialogActions>
				</>
			)}
		</>
	)
}
