import { getAuth } from "firebase/auth"
import { useState, useEffect } from "react"
import { useListVals } from "react-firebase-hooks/database"
import { ref } from "firebase/database"
import { db } from "../api/firebase"
import { get } from "firebase/database"
import { Button, Grid, Paper, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

import { ArrowForwardIos } from "@mui/icons-material"

import { ApartmentRounded, CottageRounded, HouseRounded } from "@mui/icons-material"

const ICONS = {
	apartment: ApartmentRounded,
	house: HouseRounded,
	cottage: CottageRounded,
}

export default function StartPagePresenter() {
	const navigate = useNavigate()
	const { currentUser } = getAuth()

	const [boxes, setBoxes] = useState([])
	const [boxIds, , boxIdsError] = useListVals(ref(db, `users/${currentUser.uid}/boxes`))

	// Fetch boxes
	useEffect(() => {
		if (!boxIds || boxIdsError) return
		const promises = boxIds.map(id => get(ref(db, "keyboxes/" + id + "/info")))
		Promise.all(promises)
			.then(data => setBoxes(data.map((snap, i) => ({ ...snap.val(), id: boxIds[i] }))))
			.catch(error => console.error(error))
	}, [boxIds, boxIdsError])

	useEffect(() => {
		document.title = "Keyboxes"
	  }, [])

	return (
		<div>
            <Typography variant="h1" >Manage your keyboxes</Typography>
			<Grid container spacing={2} columns={{ xs: 2, md: 4 }} sx={{mt: 3}}>
				{boxes.map(box => {
					const Icon = ICONS[box.type] || HouseRounded
					return (
						<Grid item xs={1} key={box.id}>
							<Paper sx={{ overflow: "hidden" }}>
								{box.image && box.image !== "" ? (
									<img
										src={box.image}
										width={"100%"}
										height={200}
										alt={"image for " + box.name}
										className="cover"
									/>
								) : (
									<Icon sx={{ fontSize: 100, color: box.color }} />
								)}
								<Stack sx={{ p: 3 }} spacing={2} direction="column">
									<Typography variant="h4">{box.name}</Typography>
									<Stack direction="row" justifyContent="flex-end" >
										<Button
											onClick={() => navigate(`/${box.id}`)}
											variant="outlined"
											endIcon={<ArrowForwardIos />}
										>
											Visit
										</Button>
									</Stack>
								</Stack>
							</Paper>
						</Grid>
					)
				})}
			</Grid>
		</div>
	)
}
