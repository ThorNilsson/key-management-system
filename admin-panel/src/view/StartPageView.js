import { ApartmentRounded, CottageRounded, HouseRounded, ArrowForwardIos, Add } from "@mui/icons-material"
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	CircularProgress,
	Grid,
	Stack,
	Typography,
    Box
} from "@mui/material"

const ICONS = {
	apartment: ApartmentRounded,
	house: HouseRounded,
	cottage: CottageRounded,
}

export default function StartPageView({ navigate, boxes, loading }) {
	return (
		<div>
			<Typography variant="h1">Manage your keyboxes</Typography>
			{loading ? (
				<CircularProgress />
			) : boxes.length === 0 ? (
				<Stack direction="row" alignItems="center" justifyContent="center">
					<Box component="span" sx={{ p: 5, my: 2, borderRadius: 2, border: "2px dashed grey" }}>
						<Typography variant="h2">You currently have no boxes assigned to you</Typography>
					</Box>
				</Stack>
			) : (
				<Grid container spacing={2} columns={{ xs: 2, md: 4 }} sx={{ mt: 3 }}>
					{boxes.map(box => {
						const Icon = ICONS[box.type] || HouseRounded
						return (
							<Grid item xs={1} key={box.id}>
								<Card>
									<CardActionArea onClick={() => navigate(`/${box.id}`)}>
										{box.image && box.image !== "" ? (
											<CardMedia
												component="img"
												height="140"
												image={box.image}
												alt={"image for " + box.name}
											/>
										) : (
											<CardMedia>
												<Icon sx={{ fontSize: 100, color: box.color }} />
											</CardMedia>
										)}
										<CardContent sx={{ p: 3 }} spacing={2} direction="column">
											<Typography variant="h3" gutterBottom>
												{box.name}
											</Typography>
											<Typography
												variant="body1"
												sx={{
													display: "-webkit-box",
													overflow: "hidden",
													WebkitBoxOrient: "vertical",
													WebkitLineClamp: 2,
												}}
											>
												{box.description}
											</Typography>
										</CardContent>
										<CardActions style={{ justifyContent: "flex-end" }}>
											<Button variant="outlined" endIcon={<ArrowForwardIos />}>
												Visit
											</Button>
										</CardActions>
									</CardActionArea>
								</Card>
							</Grid>
						)
					})}
				</Grid>
			)}
			<Stack direction="row" alignItems="center" justifyContent="center">
				<Button
					variant="outlined"
					size="large"
					sx={{ px: 2, mt: 2 }}
					onClick={() => navigate(`/add-box`)}
					endIcon={<Add />}
				>
					Add Box
				</Button>
			</Stack>
		</div>
	)
}
