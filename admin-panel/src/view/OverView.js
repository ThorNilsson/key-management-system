import { Grid, Paper, Typography } from "@mui/material"

export default function OverView({ keys }) {
	return (
		<div>
			<Typography variant="h3" sx={{ mb: 3 }}>
				Key box status
			</Typography>
			<Grid container columns={8} spacing={1} direction="row" alignItems="stretch">
				{keys.map(key => (
					<Grid item xs={1}>
						<Paper sx={{ p: 1 }}>
							{key ? (
								<>
									<Typography variant="h5">{key.name}</Typography>
									<Typography variant="body1">{key.description}</Typography>
								</>
							) : (
								<Typography variant="h5">Empty</Typography>
							)}
						</Paper>
					</Grid>
				))}
			</Grid>
		</div>
	)
}
