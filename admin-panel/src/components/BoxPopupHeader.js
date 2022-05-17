
import Button from "@mui/material/Button"
import DialogTitle from "@mui/material/DialogTitle"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import ArrowBackIosNewRounded from "@mui/icons-material/ArrowBackIosNewRounded"
import CloseRounded from "@mui/icons-material/CloseRounded"

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
