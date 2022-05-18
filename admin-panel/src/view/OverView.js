import ButtonBase from "@mui/material/ButtonBase"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import KeyRounded from "@mui/icons-material/KeyRounded"


export default function OverView({ keys, loading, editKey }) {
	<Typography variant="h3" sx={{ mb: 3 }}>
		Key box status
	</Typography>

	return (
		<div>
			{loading ? (
				<CircularProgress />
			) : (
				<Grid container columns={8} spacing={1} direction="row" alignItems="stretch">
					{keys.map((key, index) => (
						<Grid item xs={1} key={index}>
							<ButtonBase onClick={() => editKey({ id: key?.id, preferredKeySlot: index + 1 })} sx={{ display: "block", height: "100%", width: "100%", textAlign: "left" }}>
								<Paper sx={{ p: 1, height: "100%" }}>
									{key ? (
										<Stack direction="column" sx={{ height: "100%" }}>
											<KeyRounded
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
