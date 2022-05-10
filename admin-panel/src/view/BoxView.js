import {
	ApartmentRounded,
	ArrowBackIosNew,
	ArrowDropDownRounded,
	CottageRounded,
	Edit,
	HouseRounded,
	Key,
} from "@mui/icons-material"
import { Button, Stack, Box, Typography, Select, MenuItem, Skeleton } from "@mui/material"
import PopupKeyForm from "../components/PopupKeyForm";

const ICONS = {
	apartment: ApartmentRounded,
	house: HouseRounded,
	cottage: CottageRounded,
}

export default function BoxView({ boxes, currentBox, backAction, changeBox, editAction,}) {
	let Icon
	if (currentBox) Icon = ICONS[currentBox.type] || HouseRounded

	const DropDownIcon = props => <ArrowDropDownRounded {...props} sx={{ fontSize: 40 }} />

	return (
		<Stack direction="row">
			<Button variant="text" color="inherit" onClick={backAction}>
				<ArrowBackIosNew />
			</Button>
			<Box sx={{ flexGrow: 1 }}>
				<Stack direction="row" spacing={3}>
					{currentBox ? (
						<>
							{currentBox.image && currentBox.image !== "" ? (
								<img
									src={currentBox.image}
									width={100}
									height={100}
									alt={"image for " + currentBox.name}
									className="profile cover"
								/>
							) : (
								<Icon sx={{ fontSize: 100, color: currentBox.color }} />
							)}
						</>
					) : (
						<Skeleton variant="circular" width={100} height={100} />
					)}
					<Box>
						{currentBox && boxes ? (
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
									<MenuItem value={box.id} key={box.id}>{box.name}</MenuItem>
								))}
							</Select>
						) : (
							<Skeleton variant="text" width={200} height={44} />
						)}
						{currentBox ? (
							<Typography variant="body1">{currentBox.description}</Typography>
						) : (
							<>
								<Skeleton variant="text" width={100} height={20} />
								<Skeleton variant="text" width={150} height={20} />
							</>
						)}
					</Box>
				</Stack>
			</Box>
			<Box>
				<Stack direction="column" spacing={1}>
					<Button variant="contained" size="small" sx={{ px: 2 }} endIcon={<Edit />} onClick={editAction}>
						Edit box
					</Button>
					<PopupKeyForm>
					</PopupKeyForm>
				</Stack>
			</Box>
		</Stack>
	)
}
