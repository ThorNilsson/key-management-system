import { CircularProgress, DialogContent, Typography, Button, DialogActions, CardMedia, Stack, Paper } from "@mui/material"
import React from "react"
import BoxPopupHeader from "../../components/BoxPopupHeader"

import { grey } from '@mui/material/colors';

import { ArrowForwardIosRounded, ImageRounded, KeyRounded } from "@mui/icons-material"

export default function KeyView({ edit, close, loading, info, release }) {
	if (loading) return <CircularProgress />

	return (
		<>
			<BoxPopupHeader title={`Key for ${info.name}`} close={close} />
			<DialogContent sx={{ width: 400 }}>
				{info.image && info.image !== "" ? (
					<CardMedia component="img" alt="No image" height="140" image={info.image} />
				) : (
					<Paper sx={{ backgroundColor: grey[200], mb: 3}}>
						<Stack justifyContent="center" alignItems="center" sx={{ minHeight: 140 }}>
							<ImageRounded sx={{ fontSize: 80 }} />
						</Stack>
					</Paper>
				)}
				<Typography variant="body1" sx={{ mb: 1 }}>
					{info.description}
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={release} disabled={info.keySlot !== info.preferredKeySlot} variant="contained" color="error" endIcon={<KeyRounded />}>
					Release key
				</Button>
				<Button onClick={edit} variant="outlined" endIcon={<ArrowForwardIosRounded />}>
					Edit key
				</Button>
			</DialogActions>
		</>
	)
}
