import { ApartmentRounded, CottageRounded, HouseRounded, ArrowForwardIos } from "@mui/icons-material"
import { Button, Grid, Paper, Stack, Typography } from "@mui/material"

const ICONS = {
	apartment: ApartmentRounded,
	house: HouseRounded,
	cottage: CottageRounded,
}

export default function StartPageView({ navigate, boxes }) {
	return (
		<div>
			<Typography variant="h1">Manage your keyboxes</Typography>
			<Grid container spacing={2} columns={{ xs: 2, md: 4 }} sx={{ mt: 3 }}>
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
									<Stack direction="row" justifyContent="flex-end">
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
