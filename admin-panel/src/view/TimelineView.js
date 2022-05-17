import "react-calendar-timeline/lib/Timeline.css"
import moment from "moment"
import Timeline, { TimelineHeaders, SidebarHeader, DateHeader, TodayMarker } from "react-calendar-timeline"
import { Typography, Chip, Button, Stack, Skeleton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import KeyIcon from "@mui/icons-material/Key"
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing"
import EastIcon from "@mui/icons-material/East"
import MessageIcon from "@mui/icons-material/Message"
import useTitle from "../hooks/useTitle"

function groupRenderer({ group }) {
	return (
		<div className="custom-group">
			<Stack direction="row" spacing={2} style={{ alignItems: "center" }}>
				<KeyIcon fontSize={"medium"} />
				<p
					className="title"
					style={{
						"font-family": "Source Sans Pro, sans-serif",
						"font-size": 14,
					}}
				>
					{group.title}
				</p>
			</Stack>
		</div>
	)
}

export default function TimelineView(props) {
	useTitle("Timeline")

	return (
		<div>
			<Typography variant="h3" sx={{ mb: 3 }}>
				Timeline
			</Typography>
			<Stack direction="row" spacing={2} justifyContent={"space-between"}>
				{props.selectedBooking.start_time === undefined ? (
					<>
						<Skeleton variant="circular" width={135} height={30} style={{ borderRadius: "20px" }} />
						<Skeleton variant="circular" width={135} height={30} style={{ borderRadius: "20px" }} />
						<Skeleton variant="rectangular" width={400} height={30} style={{ borderRadius: "20px" }} />
						<Skeleton variant="rectangular" width={50} height={37} />
					</>
				) : (
					<>
						<Stack direction="row" spacing={2}>
							<Chip
								label={"Check in: " + props.selectedBooking.start_time}
								icon={<EastIcon />}
								variant="outlined"
							/>

							<Chip
								label={"Check out: " + props.selectedBooking.end_time}
								icon={<CallMissedOutgoingIcon />}
							/>

							<Chip
								label={props.selectedBooking.message}
								color={"primary"}
								icon={<MessageIcon />}
								variant="outlined"
							/>
						</Stack>
						<Button
							variant="outlined"
							startIcon={<DeleteIcon />}
							onClick={props.handleBookingDelete}
							style={{ "align-self": "left" }}
						>
							Delete
						</Button>
					</>
				)}
			</Stack>

			<br />
			<div className="Timeline">
				<Timeline
					groups={props.groups}
					groupRenderer={groupRenderer}
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
					onItemMove={(itemId, dragTime, newGroupOrder) => {
						props.handleBookingMove(itemId, dragTime, props.groups[newGroupOrder])
					}}
					onBoundsChange={(canvasTimeStart, canvasTimeEnd) => {
						console.log({ canvasTimeStart, canvasTimeEnd })
					}}
				>
					<TodayMarker interval={2000} />
					<TimelineHeaders>
						<SidebarHeader headerData={{ someData: "extra" }}>
							{({ getRootProps }) => {
								return (
									<Stack
										direction="row"
										spacing={2}
										style={{ alignItems: "center", background: "white" }}
									>
										<Typography variant="h3" color="gray" {...getRootProps()}>
											Keys
										</Typography>
									</Stack>
								)
							}}
						</SidebarHeader>

						<DateHeader
							unit="primaryHeader"
							style={{
								background: "#1976d2",
								color: "black",
								"font-weight": "500",
								"font-family": "'Roboto','Helvetica','Arial','sans-serif'",
								"font-size": 20,
							}}
						/>

						<DateHeader
							style={{
								background: "white",
								"font-family": "'Roboto','Helvetica','Arial','sans-serif'",
								"font-size": 14,
							}}
						/>
					</TimelineHeaders>
				</Timeline>
			</div>
		</div>
	)
}
