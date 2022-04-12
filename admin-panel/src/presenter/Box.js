import { Tabs, Tab } from "@mui/material"
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"

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
		color: "#000",
		type: "house",
	},
]

const TABS = [
	{
		label: "Overview",
        order: 1
	},
	{
		link: "bookings",
		label: "Bookings",
        order: 2
	},
	{
		link: "timeline",
		label: "Timeline",
        order: 3
	},
	{
		link: "events",
		label: "Events",
        order: 4
	},
]

export default function BoxPresenter() {
	const { boxId } = useParams()
	const location = useLocation()
	const navigate = useNavigate()

	const box = boxes.find(box => box.id === boxId)

	if (!box) return <div>Not found</div>

	const tab = TABS.find(tab => location.pathname.indexOf(tab.link) !== -1) || TABS[0]

	const handleChange = (_, newValue) => {
        const { link } = TABS.find(tab => tab.label === newValue)
		navigate(`/${boxId}/${link || ''}`)
	}

	return (
		<div>
			{box.name}
			<Tabs value={tab.label} onChange={handleChange}>
				{TABS.map(tab => (
					<Tab key={tab.label} value={tab.label} label={tab.label} />
				))}
			</Tabs>

			<Outlet />
		</div>
	)
}
