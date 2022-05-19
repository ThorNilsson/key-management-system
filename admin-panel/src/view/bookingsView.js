import {DataGrid, GridToolbar} from "@mui/x-data-grid"
import Typography from "@mui/material/Typography"
import CircularProgress from '@mui/material/CircularProgress';
import {useEffect} from 'react'
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";

export default function BookingsView({rows, columns, loading, handleShowPrevious, showPrevious}) {
    useEffect(() => {
        document.title = "Bookings"
    }, [])

    return (
        <div>
            <Stack direction="row" spacing={2} sx={{ mb: 3 }} justifyContent={"space-between"}>
                <Typography variant="h3" sx={{mb: 3}}>
                    All current bookings for key box {2}
                </Typography>
                <Button size={'small'} variant="outlined" onClick={() => handleShowPrevious(!showPrevious)}>
                    {showPrevious ? "Hide previous bookings" : "Show previous bookings"}
                </Button>
            </Stack>
            {loading ? (
                <CircularProgress/>
            ) : (
                <div style={{height: 800,}}>
                    {console.log(rows)}
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            sorting: {
                                sortModel: [{field: "checkIn", sort: "asc"}],
                            },
                        }}
                        proleSize={10}
                        rowsPerProleOptions={[10]}
                        checkboxSelection={false}
                        showColumnRightBorder={false}
                        disableColumnMenu
                        components={{Toolbar: GridToolbar}}
                    />
                </div>
            )}
        </div>
    )
}
