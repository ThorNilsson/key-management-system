import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import Dialog from "@mui/material/Dialog"
import { useEffect, useState, useMemo } from "react"
import { Outlet, useNavigate, useParams, generatePath } from "react-router-dom"

import { useBasePath } from "../util"

import BoxView from "../view/BoxView"
import { db } from "../api/firebase"
import { ref, get } from "firebase/database"
import { getAuth } from "firebase/auth"
import { useListVals } from "react-firebase-hooks/database"
const TABS = [
	{
		link: "",
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
	const navigate = useNavigate()
	const basePath = useBasePath()

	const adminPage = useMemo(() => getAdminTabFromBasePath(basePath), [basePath])

	const [box, setBox] = useState(null)
	const [boxes, setBoxes] = useState(null)
	const [boxIds, , boxIdsError] = useListVals(ref(db, `users/${currentUser?.uid}/boxes`))

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
		if (!boxes) return
		setBox(boxes.find(b => b.id === boxId))
	}, [boxId, boxes, boxIdsError])

	if (box === null) return <div>Not found</div>

	const tab = TABS.find(tab => tab.link === adminPage)

	const handleChange = (_, newValue) => {
		const { link } = TABS.find(tab => tab.label === newValue)
		navigate(`/${boxId}/${link}`)
	}

	return (
		<div>
			<BoxView
				boxes={boxes}
				currentBox={box}
				backAction={() => navigate("/")}
				changeBox={boxId => navigate(generatePath(basePath, { boxId }))}
				editAction={() => navigate(`/${boxId}/edit`)}
				newBookingAction={() => navigate(`/${boxId}/bookings/new`)}
			/>
			{tab ? (
				<>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Tabs value={tab?.label} onChange={handleChange}>
							{TABS.map(tab => (
								<Tab key={tab.label} value={tab.label} label={tab.label} />
							))}
						</Tabs>
					</Box>
					<Box sx={{ py: 2 }}>
						<Outlet />
					</Box>
				</>
			) : (
				<Dialog
					scroll="paper"
					open={true}
					onClose={() => {
                        try {
                            const search = basePath.replace("/:boxId/", "").split("/")[0]
                            const tab = TABS.find(tab => tab.link === search)
                            if(!tab) return navigate(`/${boxId}`)
                            navigate(`/${boxId}/${tab.link}`)
                            
                        } catch (error) {
                            console.error("Error when closing Dialog", error)
                            navigate(`/${boxId}`)
                        }
					}}
					maxWidth={window.innerWidth + "px"}
				>
					<Outlet />
				</Dialog>
			)}
		</div>
	)
}

function getAdminTabFromBasePath(basePath) {
	return basePath.split("/").join("").replace(":boxId", "")
}
