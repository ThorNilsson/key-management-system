import { DeleteRounded, ArrowForwardIosRounded, ScheduleRounded, EmailRounded, KeyRounded, WysiwygRounded } from "@mui/icons-material"
import {
	Button,
	CircularProgress,
	DialogActions,
	DialogContent,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
    ListItemText,
} from "@mui/material"
import React from "react"
import BoxPopupHeader from "../../components/BoxPopupHeader"

export default function BookingView({ loading, booking, deleteBooking, edit, close }) {
	if (loading) return <CircularProgress />

	if (!booking) return <div>No booking found</div>

	return (
		<>
			<BoxPopupHeader title={`View booking for ${booking.name}`} close={close} />
			<DialogContent>
				<List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<ScheduleRounded />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Time" secondary={`From ${booking.checkIn} to ${booking.checkOut}`} />
					</ListItem>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<EmailRounded />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Email" secondary={booking.email} />
					</ListItem>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<KeyRounded />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Room" secondary={booking.keyId} />
					</ListItem>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<WysiwygRounded />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Message" secondary={booking.message} />
					</ListItem>
				</List>
			</DialogContent>
			<DialogActions>
				<Button onClick={deleteBooking} variant="contained" color="error" endIcon={<DeleteRounded />}>
					Delete
				</Button>
				<Button onClick={edit} variant="outlined" endIcon={<ArrowForwardIosRounded />}>
					Edit
				</Button>
			</DialogActions>
		</>
	)
}
