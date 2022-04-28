import { Tabs, Tab, Box } from "@mui/material"
import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate, useParams, generatePath } from "react-router-dom"

import { useBasePath } from "../util"

import BoxView from "../view/BoxView"

import { db } from "../api/firebase"
import { ref, onValue, get } from "firebase/database"
import { getAuth } from "firebase/auth"
import { useListVals } from "react-firebase-hooks/database"

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
	const { currentUser } = getAuth()
	const { boxId } = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const basePath = useBasePath()

	const [box, setBox] = useState(null)
	const [boxes, setBoxes] = useState(null)
	const [boxIds, _, boxIdsError] = useListVals(ref(db, `users/${currentUser.uid}/boxes`))

    // Fetch boxes
	useEffect(() => {
		if (!boxIds || boxIdsError) return
		const promises = boxIds.map(id => get(ref(db, "keyboxes/" + id + "/info")))
		Promise.all(promises)
			.then(data => setBoxes(data.map((snap, i) => ({ ...snap.val(), id: boxIds[i] }))))
			.catch(error => console.error(error))
	}, [boxIds, boxIdsError])

    // Keep track of current box
	useEffect(() => {
        if(!boxes) return
        setBox(boxes.find(b => b.id == boxId))
	}, [boxId, boxes, boxIdsError])

	if (box === null) return <div>Not found</div>

	const tab = TABS.find(tab => location.pathname.indexOf(tab.link) !== -1) || TABS[0]

	const handleChange = (_, newValue) => {
		const { link } = TABS.find(tab => tab.label === newValue)
		navigate(`/${boxId}/${link || ""}`)
	}

    console.log(box)

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
            <Box sx={{py: 2}}>
			    <Outlet />
            </Box>
		</div>
	)
}
