import { Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"

import CircularProgress from "@mui/material/CircularProgress"

export default function EventsView({ rows, loading, columns }) {
	return (
		<div>
			<Typography variant="h3" sx={{ mb: 3 }}>
				All current bookings for key box {2}
			</Typography>
			{loading ? (
				<CircularProgress />
			) : (
				<div style={{ height: 800, width: "100%" }}>
					<DataGrid
						initialState={{
							sorting: {
								sortModel: [{ field: 'time', sort: 'desc' }],
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
