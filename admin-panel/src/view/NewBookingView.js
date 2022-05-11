import * as React from 'react';
import TextField from '@mui/material/TextField';
import {StaticDateRangePicker} from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Key } from "@mui/icons-material";
import { db } from "../api/firebase"
import { ref, get, set, push, onValue } from "firebase/database"
import { useParams } from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function NewBookingView() {
    const [value, setValue] = React.useState([null, null]);
    const [checkIn, setCheckIn] = React.useState('');
    const [checkOut, setCheckOut] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [room, setRoom] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');
    const {boxId} = useParams()

    const handleChange = (event) => {
        setRoom(event.target.value);
    };

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
            <Box sx={{minWidth: 120}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Booked room</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={room}
                        label="Booked room"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDateRangePicker
                    displayStaticWrapperAs="desktop"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                        <React.Fragment>
                            <TextField {...startProps} />
                            <Box sx={{mx: 2}}> to </Box>
                            <TextField {...endProps} />
                        </React.Fragment>
                    )}
                />
            </LocalizationProvider>
        </div>
    )
        ;
}