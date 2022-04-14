import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
export default function BookingsView(props) {
    return (
        <div className='tableContainer'>
            <Typography variant="h3" sx={{mb: 3}}>All current bookings for key box {2}</Typography>
            <div style={{ height: 800, width: '100%' }}>
                <DataGrid
                    rows={props.rows}
                    columns={props.columns}
                    proleSize={10}
                    rowsPerProleOptions={[10]}
                    checkboxSelection={false}
                    showColumnRightBorder={false}
                />
            </div>
        </div>
    )
}