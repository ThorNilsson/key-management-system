import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import CardHeader from "@mui/material/CardHeader"
import Stack from "@mui/material/Stack"

import { DateRangePicker } from "react-date-range"

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import frLocale from "date-fns/locale/fr"


export default function BookingFormView({
    keys,
	handleSubmit,
	setCheckIn,
	checkInTime,
	setCheckInTime,
	setCheckOut,
	checkOutTime,
	setCheckOutTime,
	email,
	setEmail,
	room,
	setRoom,
	message,
	setMessage,
	name,
	setName,
	dateRange,
	setDateRange,
    formRef
}) {
	return (
		<Stack direction="column" onSubmit={handleSubmit} ref={formRef} component="form" spacing={2}>
			<TextField
				onInput={e => setName(e.target.value)}
				autoFocus
				margin="dense"
				label="Guest name"
				type="text"
				fullWidth
				variant="outlined"
				value={name}
				required
			/>
			<TextField
				onInput={e => setEmail(e.target.value)}
				autoFocus
				margin="dense"
				label="Guest E-Mail"
				type="email"
				fullWidth
				variant="outlined"
				value={email}
				required
			/>
			<TextField
				onInput={e => setMessage(e.target.value)}
				autoFocus
				fullWidth
				multiline
				minRows={3}
				margin="dense"
				id="name"
				label="Message for guest"
				type="text"
				variant="outlined"
				value={message}
			/>
			<TextField
				select
				variant="outlined"
				label="Booked room"
				value={room}
				required
				onChange={event => setRoom(event.target.value)}
			>
				{keys.map(key => (
					<MenuItem key={key.id} value={key.id}>
						{key.name}
					</MenuItem>
				))}
			</TextField>
			<Stack direction="row" spacing={2}>
				<LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
					<TimePicker
						label="Time for check in"
						value={checkInTime}
						onChange={newValue => {
							setCheckInTime(newValue)
							console.log(checkInTime)
						}}
						renderInput={params => <TextField fullWidth required {...params} />}
					/>
					<TimePicker
						label="Time for check out"
						value={checkOutTime}
						onChange={newValue => {
							setCheckOutTime(newValue)
							console.log(checkOutTime)
						}}
						renderInput={params => <TextField fullWidth required {...params} />}
					/>
				</LocalizationProvider>
			</Stack>
			<div>
				<CardHeader title="Dates Booked"></CardHeader>
				<DateRangePicker
					onChange={({ selection }) => {
						setDateRange(selection)
						const { startDate, endDate } = selection
						setCheckIn(startDate)
						setCheckOut(endDate)
					}}
					showSelectionPreview={true}
					moveRangeOnFirstSelection={false}
					months={2}
					ranges={[dateRange]}
					direction="horizontal"
					staticRanges={[]}
					inputRanges={[]}
				/>
			</div>
		</Stack>
	)
}
