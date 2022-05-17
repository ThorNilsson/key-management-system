import { DataGrid } from "@mui/x-data-grid"
import { Typography } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect } from 'react'



export default function BookingsView({rows, columns, loading}) {
	useEffect(() => {
		document.title = "Bookings"
	  }, [])

	return (
		<div>
			<Typography variant="h3" sx={{ mb: 3 }}>
				All current bookings for key box {2}
			</Typography>
            {loading ? (
                <CircularProgress />
            ) : (
			<div style={{ height: 800, maxWidth: 500 }}>
				<DataGrid
					rows={rows}
					columns={columns}
					proleSize={10}
					rowsPerProleOptions={[10]}
					checkboxSelection={false}
					showColumnRightBorder={false}
                    disableColumnMenu
				/>
			</div>
            )}
		</div>
	)
}
