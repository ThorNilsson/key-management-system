import { Grid, Paper, Typography } from "@mui/material"

import { Key } from "@mui/icons-material"

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
									<Key
										sx={{ fontSize: 40 }}
										style={{ opacity: key.keySlot === key.preferredKeySlot ? 1 : 0.3 }}
									/>
									<Typography variant="h5">{key.name}</Typography>
									<Typography variant="body2">{key.description}</Typography>
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
