import { Tabs, Tab, Box } from "@mui/material"
import { Outlet, useLocation, useNavigate, useParams, generatePath } from "react-router-dom"

import { useBasePath } from "../util"

import BoxView from "../view/BoxView"

const boxes = [
	{
		id: "123",
		name: "Box number one",
		description: "This is a description, It can describe the place it is located at",
		longitude: 1000,
		latitude: 1000,
		nrOfKeySlots: 10,
		image: "",
		color: "#000",
		type: "apartment",
	},
	{
		id: "124",
		name: "Box number two",
		description: "This is a description, It can describe the place it is located at",
		longitude: 1000,
		latitude: 1000,
		nrOfKeySlots: 10,
		image: "",
		color: "#f44336",
		type: "house",
	},
]

const TABS = [
	{
		label: "Overview",
	},
	{
		link: "bookings",
		label: "Bookings",
	},
	{
		link: "timeline",
		label: "Timeline",
	},
	{
		link: "events",
		label: "Events",
	},
]

export default function BoxPresenter() {
	const { boxId } = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const basePath = useBasePath()

	const box = boxes.find(box => box.id === boxId)

	if (!box) return <div>Not found</div>

	const tab = TABS.find(tab => location.pathname.indexOf(tab.link) !== -1) || TABS[0]

	const handleChange = (_, newValue) => {
		const { link } = TABS.find(tab => tab.label === newValue)
		navigate(`/${boxId}/${link || ""}`)
	}

	return (
		<div>
			<BoxView
				boxes={boxes}
				currentBox={box}
				backAction={() => navigate("/")}
				changeBox={boxId => navigate(generatePath(basePath, { boxId }))}
				editAction={() => alert("Edit")}
				newKeyAction={() => alert("new Key")}
			/>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs value={tab.label} onChange={handleChange}>
					{TABS.map(tab => (
						<Tab key={tab.label} value={tab.label} label={tab.label} />
					))}
				</Tabs>
			</Box>

			<Outlet />
		</div>
	)
}
