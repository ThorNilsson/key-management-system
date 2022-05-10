import { DataGrid } from "@mui/x-data-grid"
import { Typography } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';



export default function BookingsView({rows, columns, loading}) {
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
