import * as React from 'react';
import BookingsView from '../view/bookingsView';

export default function BookingsPresenter() {

    return (
        <BookingsView columns={columns} rows={rows}/>
    )
}


const columns = [
    { field: 'id', headerName: 'Key ID', width: 100 },
    { field: 'room', headerName: 'Room', width: 70 },
    { field: 'checkIn', headerName: 'Check in', width: 130 },
    { field: 'checkOut', headerName: 'Check out', width: 130 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'role', headerName: 'Role', width: 70 },
    { field: 'message', headerName: 'Message', width: 500 },
];

const rows = [
    { id: '1', room: '51', checkIn: '2022-03-24 12:00', checkOut: '2022-03-25 11:00', name: 'Karin Boye', role: 'guest', message: '...Protect your Realtime Database resources from abuse, such as billing fraud or phishing' },
    { id: '2', room: '51', checkIn: '2022-03-24 12:00', checkOut: '2022-03-25 11:00', name: 'Karin Boye', role: 'guest', message: '...' },
    { id: '3', room: '51', checkIn: '2022-03-24 12:00', checkOut: '2022-03-25 11:00', name: 'Karin Boye', role: 'guest', message: '...' },
    { id: '4', room: '52', checkIn: '2022-03-24 12:00', checkOut: '2022-03-25 11:00', name: 'Karin Boye', role: 'guest', message: '...' },
    { id: '5', room: '52', checkIn: '2022-03-24 12:00', checkOut: '2022-03-25 11:00', name: 'Karin Boye', role: 'guest', message: '...' },
    { id: '6', room: '54', checkIn: '2022-03-24 12:00', checkOut: '2022-03-25 11:00', name: 'Karin Boye', role: 'guest', message: '...' },
    { id: '7', room: '54', checkIn: '2022-03-24 12:00', checkOut: '2022-03-25 11:00', name: 'Karin Boye', role: 'guest', message: '...' },
    { id: '8', room: '55', checkIn: '2022-03-24 12:00', checkOut: '2022-03-25 11:00', name: 'Karin Boye', role: 'guest', message: '...' },
    { id: '9', room: '55', checkIn: '2022-03-24 12:00', checkOut: '2022-03-25 11:00', name: 'Karin Boye', role: 'guest', message: '...' },
    { id: '10', room: '55', checkIn: '2022-03-24 12:00', checkOut: '2022-03-25 11:00', name: 'Karin Boye', role: 'guest', message: '...' },
];
