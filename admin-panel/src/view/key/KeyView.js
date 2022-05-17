import { CircularProgress, DialogContent, Typography, Button, DialogActions, CardMedia } from "@mui/material"
import React from "react"
import BoxPopupHeader from "../../components/BoxPopupHeader"

import { ArrowForwardIosRounded, Key } from "@mui/icons-material"

export default function KeyView({ edit, close, loading, info, release }) {
	if (loading) return <CircularProgress />

	return (
		<>
			<BoxPopupHeader title={`Key for ${info.name}`} close={close} />
			<DialogContent sx={{ width: 400 }}>
				<CardMedia
					component="img"
					alt="No image"
					height="140"
					image={info.image}
				/>
				<Typography variant="body1" sx={{ mb: 1 }}>
					{info.description}
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={release} variant="contained" color="error" endIcon={<Key />}>
					Release key
				</Button>
				<Button onClick={edit} variant="outlined" endIcon={<ArrowForwardIosRounded />}>
					Edit key
				</Button>
			</DialogActions>
		</>
	)
}
