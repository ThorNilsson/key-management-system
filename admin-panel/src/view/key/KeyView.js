import { CircularProgress, DialogContent, Typography, Button } from "@mui/material"
import React from "react"
import BoxPopupHeader from "../../components/BoxPopupHeader"

import { ArrowForwardIosRounded, Key } from "@mui/icons-material"

export default function KeyView({ edit, close, loading, name, release }) {
	return (
		<>
			<BoxPopupHeader title={`Key for ${name}`} close={close} />
            {loading ? <CircularProgress /> : (
                <DialogContent sx={{width: 400}}>
                    <Typography variant="h4" sx={{mb: 1}}>Change key attributes</Typography>
                    <Button onClick={edit} variant="outlined" endIcon={<ArrowForwardIosRounded />}>Edit key</Button>
                    <Typography variant="h4" sx={{mt: 4, mb: 1}}>Actions</Typography>
                    <Button onClick={release} variant="outlined" color="error" endIcon={<Key />}>Release key</Button>
                </DialogContent>
            )}
		</>
	)
}
