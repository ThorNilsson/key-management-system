import { ApartmentRounded, ArrowBackIosNew, CottageRounded, HouseRounded } from "@mui/icons-material"
import { Button, Stack, Box, Typography } from "@mui/material"

const ICONS = {
	apartment: ApartmentRounded,
	house: HouseRounded,
	cottage: CottageRounded,
}

export default function BoxView({ boxes, currentBox, backAction }) {
	const Icon = ICONS[currentBox.type] || HouseRounded

	return (
		<Stack direction="row">
			<Button variant="text" color="inherit" onClick={backAction}>
				<ArrowBackIosNew />
			</Button>
			<Box sx={{ flexGrow: 1 }}>
				<Stack direction="row" spacing={3}>
					<Icon sx={{ fontSize: 100, color: currentBox.color }} />
					<Box>
						<Typography variant="h1">{currentBox.name}</Typography>
						<Typography variant="body1">{currentBox.description}</Typography>
					</Box>
				</Stack>
			</Box>
		</Stack>
	)
}
