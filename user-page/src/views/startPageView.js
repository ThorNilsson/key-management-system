import { ApartmentRounded, CottageRounded, HouseRounded, ArrowForwardIos, Add } from "@mui/icons-material"
import { format } from 'date-fns'
import Box from '@mui/material/Box';
import logo from '../logo-box.png'

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
	Link
} from "@mui/material"

const ICONS = {
	apartment: ApartmentRounded,
	house: HouseRounded,
	cottage: CottageRounded,
}

export default function StartPageView({ navigate, currentBookings, expiredBookings, keys, loading, bookingLoading, logOut}) {
	console.log(keys)
	return (
		<div>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					bgcolor: '#dddddd',
					height: '10vh',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}>
				<img src={logo} className='logo'></img>
				<div className='headerText'>Manage your bookings</div>
				<Button size='small' sx={{ mt: 0.5, mr: '10px', color: 'white', backgroundColor: '#d43d3f', ':hover': { backgroundColor: '#9e2e2e' } }} variant='contained' onClick={logOut}>Sign Out</Button>
			</Box>
			{loading || bookingLoading ? (
				<div className='topbar1' >
					<Stack justifyContent="center"
						alignItems="center" height={'100%'}><CircularProgress /></Stack>
				</div>
			) : currentBookings.length === 0 && expiredBookings.length === 0 ? (
				<Stack direction="row" alignItems="center" justifyContent="center">
					<bookings component="span" sx={{ p: 5, my: 2, borderRadius: 2, border: "2px dashed grey" }}>
						<Typography variant="h2">You currently have no bookings assigned to you</Typography>
					</bookings>
				</Stack>
			) : (
				<>
				<Stack>
					{currentBookings.map(booking => {
						const Icon = ICONS[booking.type] || HouseRounded
						const key = keys.find(key => key.id === booking.keyId)
						return (
							<Grid item xs={1} key={booking.id}>
								<Card sx={{ mx: 1, mt: 2 }}>
									<CardActionArea onClick={() => navigate(`/booking/${booking.id.bookingId}`)} >
										{key.image && key.image !== "" ? (
											<CardMedia
												component="img"
												height="140"
												image={key.image}
												alt={"image for " + key.name}
											/>
										) : (
											<CardMedia>
												<Icon sx={{ fontSize: 100, color: booking.color }} />
											</CardMedia>
										)}
										<CardContent sx={{ p: 3 }} spacing={2} direction="column">
											<Typography variant="h3" gutterBottom>
												{key.name}
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
												{format(new Date(booking.checkIn * 1000), 'eee dd MMM yyyy') + '-' + format(new Date(booking.checkOut * 1000), 'eee dd MMM yyyy')}
											</Typography>
										</CardContent>
										<CardActions style={{ justifyContent: "flex-end" }}>
											<Button component={Link} variant="outlined" endIcon={<ArrowForwardIos />} >
												Visit
											</Button>
										</CardActions>
									</CardActionArea>
								</Card>
							</Grid>
						)
					})}
				</Stack>
				<Stack>
				{expiredBookings.map(booking => {
					const Icon = ICONS[booking.type] || HouseRounded
					const key = keys.find(key => key.id === booking.keyId)
					return (
						<Grid item xs={1} key={booking.id}>
							<Card sx={{ mx: 1, mt: 2 }}>
								<CardActionArea disabled={true}>
									{key.image && key.image !== "" ? (
										<CardMedia
											component="img"
											height="140"
											image={key.image}
											alt={"image for " + key.name}
										/>
									) : (
										<CardMedia>
											<Icon sx={{ fontSize: 100, color: booking.color }} />
										</CardMedia>
									)}
									<CardContent sx={{ p: 3 }} spacing={2} direction="column">
										<Typography variant="h3" gutterBottom>
											{key.name}
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
											{format(new Date(booking.checkIn * 1000), 'eee dd MMM yyyy') + '-' + format(new Date(booking.checkOut * 1000), 'eee dd MMM yyyy')}
										</Typography>
									</CardContent>
									<CardActions style={{ justifyContent: "flex-end" }}>
										<Button component={Link} variant="outlined" color="error">
											Expired
										</Button>
									</CardActions>
								</CardActionArea>
							</Card>
						</Grid>
					)
				})}
			</Stack>
			</>
			)}
		</div>
	)
}