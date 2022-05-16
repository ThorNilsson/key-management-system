
import { Button, DialogTitle, IconButton, Stack, Typography } from "@mui/material"
import { ArrowBackIosNewRounded, CloseRounded } from "@mui/icons-material"

export default function BoxPopupHeader({ close, title, back, ...props }) {
	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...props}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{width: "100%"}}>
                {back != null && (
                    <Button onClick={back} variant="text" startIcon={<ArrowBackIosNewRounded />}>Back</Button>
                )}
                <Typography variant="h3">{title}</Typography>
                <IconButton
                    aria-label="close"
                    onClick={close}
                >
                    <CloseRounded />
                </IconButton>
            </Stack>
		</DialogTitle>
	)
}
