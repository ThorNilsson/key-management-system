import BoxPopupHeader from "../../components/BoxPopupHeader"
import * as React from "react"
import { TextField, MenuItem, Button, DialogContent, DialogActions, Typography, Stack, Paper } from "@mui/material"
import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import LocationPicker from "../../components/LocationPicker"
import { getAuth } from "firebase/auth"
import { push, ref, set } from "firebase/database"
import { db } from "../../api/firebase"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AddBoxPresenter() {
    const auth = getAuth()
    const navigate = useNavigate()
    const [boxId, setBoxId] = useState();
    const handleSubmit = () => {
        set(ref(db, "users/" + auth.currentUser.uid + "/boxes/" + boxId),'')
            .then(() => navigate("/" + boxId))
            .catch(error => alert("Something went wrong " + error.message))
    }


    return (
        <>
            <BoxPopupHeader title={`Add new Keybox`} />

            <DialogContent>
                <TextField
                    onInput={e => setBoxId(e.target.value)}
                    autoFocus
                    margin="normal"
                    id="boxId"
                    label="Box ID"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={boxId}
                    required
                />
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={handleSubmit} sx={{mr: 2}}>
                    Add Box
                </Button>
            </DialogActions>
        </>
    )
}