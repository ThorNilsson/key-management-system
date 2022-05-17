import "react-calendar-timeline/lib/Timeline.css"
import moment from "moment"
import Timeline, { TimelineHeaders, SidebarHeader, DateHeader, TodayMarker } from "react-calendar-timeline"
import { Typography, Chip, Button, Stack, Box, Paper } from "@mui/material"
import KeyIcon from "@mui/icons-material/Key"
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing"
import EastIcon from "@mui/icons-material/East"

export default function TimelineView(props) {
	return (
		<Stack directions="column" spacing={2}>
			<Typography variant="h3">Timeline</Typography>
			<DisplaySelectedBooking
				selectedBooking={props.selectedBooking}
				handleViewBooking={props.handleViewBooking}
			/>
			<Timeline
				groups={props.groups}
				groupRenderer={groupRenderer}
				itemRenderer={itemRenderer}
				items={props.items}
				defaultTimeStart={moment().subtract(15, "days")}
				defaultTimeEnd={moment().add(15, "days")}
				minZoom={12 * 60 * 60 * 1000} //12h
				stackItems={true}
				canMove={true}
				canChangeGroup={true}
				canResize={false}
				traditionalZoom={true}
				dragSnap={60 * 6 * 60 * 1000}
				lineHeight={40}
				itemHeightRatio={0.8}
				clickTolerance={1}
				onCanvasClick={(groupId, time, e) => {
					props.handleDeSelectingBooking(groupId, time)
				}}
				onCanvasDoubleClick={(groupId, time, e) => {
					props.handleNewBooking(groupId, time)
					console.log({ groupId, time, e })
				}}
				onItemSelect={(itemId, time, e) => {
					props.handleSelectingBooking(itemId)
					console.log({ itemId, booking: props.selectedBooking, e })
				}}
				onItemDoubleClick={itemId => {
					props.handleViewBooking(itemId)
				}}
				onItemMove={(itemId, dragTime, newGroupOrder) => {
					props.handleBookingMove(itemId, dragTime, props.groups[newGroupOrder])
				}}
			>
				<TodayMarker interval={2000} />
				<TimelineHeaders>
					<SidebarHeader>
						{({ getRootProps }) => {
							return (
								<Stack
									direction="row"
									spacing={2}
									style={{ alignItems: "center", background: "white" }}
								>
									<Typography variant="h3" {...getRootProps()}>
										Keys
									</Typography>
								</Stack>
							)
						}}
					</SidebarHeader>

					<DateHeader
						unit="primaryHeader"
						intervalRenderer={({ getIntervalProps, intervalContext }) => (
							<Stack
								justifyContent="center"
								alignItems="center"
								sx={{
									backgroundColor: "primary.main",
									height: "100%",
									boxShadow: "-1px 0px 0px 0px white",
								}}
								{...getIntervalProps()}
							>
								<Typography variant="h4" sx={{ color: "common.white" }}>
									{intervalContext.intervalText}
								</Typography>
							</Stack>
						)}
					/>

					<DateHeader
						intervalRenderer={({ getIntervalProps, intervalContext }) => (
							<>
								<Stack
									justifyContent="center"
									alignItems="center"
									direction="row"
									sx={{
										backgroundColor: "primary.dark",
										height: "100%",
										boxShadow: "-1px 0px 0px 0px white",
									}}
									{...getIntervalProps()}
								>
									<Typography variant="body1" sx={{ color: "common.white" }}>
										{intervalContext.intervalText}
									</Typography>
								</Stack>
							</>
						)}
					/>
				</TimelineHeaders>
			</Timeline>
		</Stack>
	)
}

function itemRenderer({ item, timelineContext, itemContext, getItemProps }) {
	const { style, ...itemsProps } = getItemProps()
	const { top, left, width, height } = itemContext.dimensions

	const isItemPassed = moment(item.checkOut * 1000) < moment()

	const timeRelativeStlyes = {
		backgroundColor: isItemPassed ? "primary.main" : "primary.dark",
		opacity: isItemPassed ? 0.8 : 1,
	}

	return (
		<Paper
			{...itemsProps}
			elevation={itemContext.selected ? 4 : 0}
			sx={{
				position: "absolute",
				top,
				left,
				width,
				height,
				zIndex: style.zIndex,
				color: "common.white",
				overflow: "hidden",
                p: 1,
				...timeRelativeStlyes,
			}}
		>
			<Stack justifyContent="center">
				<Typography variant="h6" sx={{whiteSpace: "nowrap"}}>{item.title}</Typography>
			</Stack>
		</Paper>
	)
}

function groupRenderer({ group }) {
	return (
		<Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} style={{ height: "100%" }}>
			<KeyIcon fontSize={"medium"} />
			<Typography variant="body1">{group.title}</Typography>
		</Stack>
	)
}

function DisplaySelectedBooking({ selectedBooking, handleViewBooking }) {
	if (!selectedBooking.start_time) return <Box sx={{ height: 36 }} />

	return (
		<Stack direction="row" spacing={2} justifyContent={"space-between"}>
			<Stack direction="row" spacing={2}>
				<Chip label={"Check in: " + selectedBooking.start_time} icon={<EastIcon />} variant="outlined" />

				<Chip label={"Check out: " + selectedBooking.end_time} icon={<CallMissedOutgoingIcon />} />
			</Stack>
			<Button variant="contained" onClick={() => handleViewBooking()}>
				View
			</Button>
		</Stack>
	)
}
