import * as React from 'react';
import TextField from '@mui/material/TextField';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Box from '@mui/material/Box';
import { DateRangePicker } from 'react-date-range';
import { db } from "../api/firebase"
import { ref, get, set, push, onValue } from "firebase/database"
import { resolvePath, useParams, useNavigate } from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useList } from "react-firebase-hooks/database";
import { CardHeader, Stack } from '@mui/material';
import { addDays, getHours, setHours, getMinutes, setMinutes } from 'date-fns';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import frLocale from 'date-fns/locale/fr';


export default function NewBookingView() {
    const [checkIn, setCheckIn] = React.useState(new Date(Date.now()));
    const [checkInTime, setCheckInTime] = React.useState(new Date('2022-01-01 12:00'));
    const [checkOut, setCheckOut] = React.useState(new Date(Date.now()));
    const [checkOutTime, setCheckOutTime] = React.useState(new Date('2022-01-01 11:00'));
    const [email, setEmail] = React.useState('');
    const [room, setRoom] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');
    const { boxId } = useParams()
    const [keys, loading, error] = useList(ref(db, `keyboxes/${boxId}/keys`))
    const [dateState, setDate] = React.useState(null)
    const [locale, setLocale] = React.useState('fr');
    const navigate = useNavigate()

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 0),
            key: 'selection'
        }
    ]);

    if (error) return <div>Something went wrong</div>
    console.log(keys)

    const keyList = keys.map(key => {
        const k = { ...key.val(), id: key.key }
        return k
    })

    const handleChange = (event) => {
        setRoom(event.target.value);
    };

    const handleSubmit = () => {
        let checkedIn = setHours(checkIn, getHours(checkInTime))
        checkedIn = setMinutes(checkedIn, getMinutes(checkInTime))

        let checkedOut = setHours(checkOut, getHours(checkOutTime))
        checkedOut = setMinutes(checkedOut, getMinutes(checkOutTime))

        const checkedInUnix = parseInt((checkedIn.getTime() / 1000).toFixed(0))
        const checkedOutUnix = parseInt((checkedOut.getTime() / 1000).toFixed(0))

        push(ref(db, 'keyboxes/' + boxId + '/bookings/'
        ), {
            name: name,
            email: email,
            message: message,
            keyId: room,
            checkIn: checkedInUnix,
            checkOut: checkedOutUnix
        }).then(() => navigate("/" + boxId + "/bookings")).catch(error => alert("Something went wrong " + error.message))
    }

    return (
        <div>
            <Box sx={{ flexDirection: 'row' }}>
                <TextField
                    onInput={(e) => setName(e.target.value)}
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Guest name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={name}
                />
                <TextField
                    onInput={(e) => setEmail(e.target.value)}
                    autoFocus
                    margin="dense"
                    id="longitude"
                    label="Guest E-Mail"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={email}
                />
                <TextField
                    onInput={(e) => setMessage(e.target.value)}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Message for guest"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={message}
                />
                <p></p>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Booked room</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={room}
                        label="Booked room"
                        onChange={handleChange}
                    >
                        {keyList.map(key => (
                            <MenuItem value={key.id}>{key.name}</MenuItem>))}
                    </Select>
                </FormControl>
                <p></p>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
                    <TimePicker
                        label="Time for check in"
                        value={checkInTime}
                        onChange={(newValue) => {
                            setCheckInTime(newValue);
                            console.log(checkInTime);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
                    <TimePicker
                        label="Time for check out"
                        value={checkOutTime}
                        onChange={(newValue) => {
                            setCheckOutTime(newValue);
                            console.log(checkOutTime);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Box>
            <Stack direction={'row'}>
                <div>
                    <CardHeader title="Dates Booked"></CardHeader>
                    <DateRangePicker
                        onChange={({selection}) => {
                            setState([selection])
                            const {startDate, endDate} = selection
                            setCheckIn(startDate)
                            setCheckOut(endDate)
                        }}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={state}
                        direction="horizontal"
                        staticRanges={[]}
                        inputRanges={[]}
                    />
                </div>
                <div>

                </div>
            </Stack>
            <Button onClick={handleSubmit}> CONFIRM BOOKING </Button>
        </div>
    );
}