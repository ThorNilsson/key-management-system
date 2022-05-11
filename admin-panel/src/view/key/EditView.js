import { Button, Stack } from "@mui/material"
import { Typography } from "@mui/material";
import { ArrowBackIosNewRounded } from "@mui/icons-material";

export default function EditKeyView({ children, save, name, back }) {
	return (
		<>
            <Button variant="text" onClick={back} startIcon={<ArrowBackIosNewRounded />}>Back</Button>
            <Typography variant="h3" element="h4" sx={{my: 2}}>Edit key for {name}</Typography>
			{children}
            <Stack direction="row" spacing={2}>
                <Button onClick={() => save(true)} fullWidth variant="contained">Update and return</Button>
                <Button onClick={save} fullWidth variant="text">Update</Button>
            </Stack>
		</>
	)
}
