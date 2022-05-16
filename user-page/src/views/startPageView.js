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
    bookings
} from "@mui/material"

const ICONS = {
	apartment: ApartmentRounded,
	house: HouseRounded,
	cottage: CottageRounded,
}

export default function StartPageView({ navigate, bookings, loading }) {
	return (
		<div>
			<Typography variant="h1">Manage your keybookings</Typography>
			{loading ? (
				<CircularProgress />
			) : bookings.length === 0 ? (
				<Stack direction="row" alignItems="center" justifyContent="center">
					<bookings component="span" sx={{ p: 5, my: 2, borderRadius: 2, border: "2px dashed grey" }}>
						<Typography variant="h2">You currently have no bookings assigned to you</Typography>
					</bookings>
				</Stack>
			) : (
				<Grid container spacing={2} columns={{ xs: 2, md: 4 }} sx={{ mt: 3 }}>
					{bookings.map(bookings => {
						const Icon = ICONS[bookings.type] || HouseRounded
						return (
							<Grid item xs={1} key={bookings.id}>
								<Card>
									<CardActionArea >
										{bookings.image && bookings.image !== "" ? (
											<CardMedia
												component="img"
												height="140"
												image={bookings.image}
												alt={"image for " + bookings.name}
											/>
										) : (
											<CardMedia>
												<Icon sx={{ fontSize: 100, color: bookings.color }} />
											</CardMedia>
										)}
										<CardContent sx={{ p: 3 }} spacing={2} direction="column">
											<Typography variant="h3" gutterBottom>
												{bookings.name}
											</Typography>
											<Typography
												variant="body1"
												sx={{
													display: "-webkit-bookings",
													overflow: "hidden",
													WebkitbookingsOrient: "vertical",
													WebkitLineClamp: 2,
												}}
											>
												{bookings.description}
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
		</div>
	)
}