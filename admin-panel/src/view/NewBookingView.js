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
import { CardHeader } from '@mui/material';
import { addDays } from 'date-fns';
import { useState } from 'react';
import Button from '@mui/material/Button';

export default function NewBookingView() {
    const [value, setValue] = React.useState([null, null]);
    const [checkIn, setCheckIn] = React.useState('');
    const [checkOut, setCheckOut] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [room, setRoom] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');
    const { boxId } = useParams()
    const [keys, loading, error] = useList(ref(db, `keyboxes/${boxId}/keys`))
    const [dateState, setDate] = React.useState(null)
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

    const handleSubmit = (event) => {
        push(ref(db, 'keyboxes/' + boxId + '/bookings/'
        ), {
            name: name,
            email: email,
            keyId: keys,
            message: message,
            checkIn: checkIn,
            checkOut: checkOut,
            url: 'https://firebasesomething.kms.com/uiy3249e6ysfdugsd987f37'
        }).then(() => navigate("/" + boxId)).catch(error => alert("Something went wrong " + error.message))
    }

    return (
        <div>
            <TextField
                onInput={(e) => setName(e.target.value)}
                autoFocus
                margin="dense"
                id="description"
                label="Guest name"
                type="text"
                fullWidth
                variant="standard"
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
                variant="standard"
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
                variant="standard"
                value={message}
            />
            <p></p>
            <Box sx={{ minWidth: 120 }}>
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
            </Box>
            <div>
                <CardHeader title="Dates Booked"></CardHeader>
                <DateRangePicker
                    onChange={item => setState([item.selection])}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={state}
                    direction="horizontal"
                />
            </div>
            <Button onClick={handleSubmit}> CONFIRM BOOKING </Button>
        </div>
    );
}