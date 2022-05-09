import { ButtonBase, Grid, Paper, Stack, Typography } from "@mui/material"

import { Key } from "@mui/icons-material"

import { CircularProgress } from "@mui/material"

export default function OverView({ keys, loading }) {
	return (
		<div>
			<Typography variant="h3" sx={{ mb: 3 }}>
				Key box status
			</Typography>

			{loading ? (
				<CircularProgress />
			) : (
				<Grid container columns={8} spacing={1} direction="row" alignItems="stretch">
					{keys.map(key => (
						<Grid item xs={1}>
							<ButtonBase sx={{ display: "block", height: "100%", width: "100%", textAlign: "left" }}>
								<Paper sx={{ p: 1, height: "100%" }}>
									{key ? (
										<Stack direction="column" sx={{ height: "100%" }}>
											<Key
												sx={{ fontSize: 40 }}
												style={{ opacity: key.keySlot === key.preferredKeySlot ? 1 : 0.3 }}
											/>
											<Typography variant="h5">{key.name}</Typography>
											<Typography variant="body2">{key.description}</Typography>
										</Stack>
									) : (
										<Stack justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
											<Typography variant="h5">Empty</Typography>
										</Stack>
									)}
								</Paper>
							</ButtonBase>
						</Grid>
					))}
				</Grid>
			)}
		</div>
	)
}
