import {
	ApartmentRounded,
	ArrowBackIosNew,
	ArrowDropDownRounded,
	CottageRounded,
	Edit,
	HouseRounded,
	Key,
} from "@mui/icons-material"
import { Button, Stack, Box, Typography, Select, MenuItem } from "@mui/material"

const ICONS = {
	apartment: ApartmentRounded,
	house: HouseRounded,
	cottage: CottageRounded,
}

export default function BoxView({ boxes, currentBox, backAction, changeBox, editAction, newKeyAction }) {
	const Icon = ICONS[currentBox.type] || HouseRounded

	const DropDownIcon = props => <ArrowDropDownRounded {...props} sx={{ fontSize: 40 }} />

	return (
		<Stack direction="row">
			<Button variant="text" color="inherit" onClick={backAction}>
				<ArrowBackIosNew />
			</Button>
			<Box sx={{ flexGrow: 1 }}>
				<Stack direction="row" spacing={3}>
					<Icon sx={{ fontSize: 100, color: currentBox.color }} />
					<Box>
						<Select
							variant="standard"
							value={currentBox.id}
							onChange={event => changeBox(event.target.value)}
							IconComponent={DropDownIcon}
							renderValue={value => (
								<Typography variant="h1">{boxes.find(box => box.id === value).name}</Typography>
							)}
							SelectDisplayProps={{ sx: { pr: "40px !important" } }}
						>
							{boxes.map(box => (
								<MenuItem value={box.id}>{box.name}</MenuItem>
							))}
						</Select>
						<Typography variant="body1">{currentBox.description}</Typography>
					</Box>
				</Stack>
			</Box>
			<Box>
				<Stack direction="column" spacing={1}>
					<Button variant="contained" size="small" sx={{px: 2}} endIcon={<Edit />} onClick={editAction}>
						Edit box
					</Button>
					<Button variant="outlined" size="small" endIcon={<Key />} onClick={newKeyAction}>
						Add new key
					</Button>
				</Stack>
			</Box>
		</Stack>
	)
}
