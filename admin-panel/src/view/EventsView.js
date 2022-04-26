import { Card, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


function EventsView(props) {

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'time', headerName: 'Time', width: 130 },
        { field: 'message', headerName: 'Message', width: 130 },
        { field: 'name', headerName: 'User', width: 130 },
        { field: 'userId', headerName: 'User ID', width: 130 },
        { field: 'bookingId', headerName: 'Booking ID', width: 130 },
    ];
    
    const rows = [
        { id: '1', room: '51', checkIn: '2022-03-24 12:00', checkOut: '2022-03-25 11:00', name: 'Karin Boye', role: 'guest', message: '...Protect your Realtime Database resources from abuse, such as billing fraud or phishing' },

    ];
    console.log(props.keys)
    return (
        <div>

            <div className='tableContainer'>
                <Typography variant="h3" sx={{ mb: 3 }}>All current bookings for key box {2}</Typography>
                <div style={{ height: 800, width: '100%' }}>
                    <DataGrid
                        rows={props.keys}
                        columns={columns}
                        proleSize={10}
                        rowsPerProleOptions={[10]}
                        checkboxSelection={false}
                        showColumnRightBorder={false}
                    />
                </div>
            </div>
        </div>
    );
}

export default EventsView;