import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Key} from "@mui/icons-material";

export default function PopupKeyForm() {
    const [open, setOpen] = React.useState(false);
    const [formState, setFormState] = React.useState({
        keyName: "",
        houseName: "",
        anotherThing: "",
        lastThing: "",
    })
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (evt) => {
        const value = evt.target.value;
        setFormState({
            ...formState,
            [evt.target.name]: value
        });
    }

    const handleSendForm = () => {
        console.log(formState.keyName)
        console.log(formState.houseName)
    }

    return (
        <div>
            <Button variant="outlined" size="small" endIcon={<Key />} onClick={handleClickOpen}>
                Add new key
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add key</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new key, carefully fill in the text fields below followed by hitting the send button
                    </DialogContentText>
                    <TextField value={formState.houseName} onChange={handleChange}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="House name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField value={formState.keyName} onChange={handleChange}
                        autoFocus
                        margin="dense"
                        id="keyid"
                        label="Key information blabla"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField value = {formState.anotherThing} onChange={handleChange}
                               autoFocus
                               margin="dense"
                               id="idk"
                               label="key field"
                               type="email"
                               fullWidth
                               variant="standard"
                    />
                    <TextField value = {formState.lastThing} onChange={handleChange}
                               autoFocus
                               margin="dense"
                               id="hejhej"
                               label="Another key field"
                               type="email"
                               fullWidth
                               variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSendForm}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
