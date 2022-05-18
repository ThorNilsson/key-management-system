import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import { DataGrid } from "@mui/x-data-grid"

import CircularProgress from "@mui/material/CircularProgress"
import DeleteIcon from "@mui/icons-material/Delete"

export default function EventsView({ rows, loading, columns, handleEventsDelete }) {
	return (
		<div>
			<Stack direction="row" spacing={2} sx={{ mb: 3 }} justifyContent={"space-between"}>
				<Typography variant="h3">
					All current bookings for key box {2}
				</Typography>
				<Button
					variant="outlined"
					size="small"
					color="error"
					startIcon={<DeleteIcon />}
					onClick={handleEventsDelete}
				>
					Clear events
				</Button>
			</Stack>
			{loading ? (
				<CircularProgress />
			) : (
				<div style={{ height: 800, width: "100%" }}>
					<DataGrid
						initialState={{
							sorting: {
								sortModel: [{ field: "time", sort: "desc" }],
							},
						}}
						rows={rows}
						columns={columns}
						proleSize={10}
						rowsPerProleOptions={[10]}
						checkboxSelection={false}
						showColumnRightBorder={false}
					/>
				</div>
			)}
		</div>
	)
}
