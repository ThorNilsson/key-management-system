import BoxPopupHeader from "../../components/BoxPopupHeader"
import * as React from 'react';
import {TextField, Box, FormControl, InputLabel, MenuItem, Select, Button} from '@mui/material';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


export default function EditBoxView(props, { close }) {
	
	return (
		<div>
			<BoxPopupHeader title={`Update information about`} close={close} />
			<Box sx={{ flexDirection: 'row' }}>
				<TextField
					onInput={(e) => props.setName(e.target.value)}
					autoFocus
					margin="dense"
					id="name"
					label="Box name"
					type="text"
					fullWidth
					variant="outlined"
					value={props.name}
					required
				/>
				<TextField
					onInput={(e) => props.setColor(e.target.value)}
					autoFocus
					margin="dense"
					id="color"
					label="Box color"
					type="text"
					fullWidth
					variant="outlined"
					value={props.color}
					required
				/>
				<TextField
					onInput={(e) => props.setDescription(e.target.value)}
					autoFocus
					margin="dense"
					id="description"
					label="Box description"
					type="text"
					fullWidth
					variant="outlined"
					value={props.description}
					required
				/>
				<TextField
					onInput={(e) => props.setImage(e.target.value)}
					autoFocus
					margin="dense"
					id="image"
					label="Box image link"
					type="text"
					fullWidth
					variant="outlined"
					value={props.image}
					required
				/>
				<TextField
					onInput={(e) => props.setLatitude(e.target.value)}
					autoFocus
					margin="dense"
					id="latitude"
					label="Latitude"
					type="text"
					fullWidth
					variant="outlined"
					value={props.latitude}
					required
				/>
				<TextField
					onInput={(e) => props.setLongitude(e.target.value)}
					autoFocus
					margin="dense"
					id="longitude"
					label="Longitude"
					type="text"
					fullWidth
					variant="outlined"
					value={props.longitude}
					required
				/>
				<TextField
					onInput={(e) => props.setKeySlots(e.target.value)}
					autoFocus
					margin="dense"
					id="nrOfKeySlots"
					label="Number of keyslots"
					type="text"
					fullWidth
					variant="outlined"
					value={props.keySlots}
					required
				/>
				<FormControl required fullWidth>
                    <InputLabel id="demo-simple-select-label">Box status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.open}
                        label="Booked room"
                        onChange={(e) => props.setOpen(e.target.value)}
                    >

                    <MenuItem value={true}>Open</MenuItem>
					<MenuItem value={false}>Closed</MenuItem>
                    </Select>
                </FormControl>
			</Box>
			<Button onClick={props.handleSubmit}> CONFIRM CHANGES </Button>
		</div>
	)
}
