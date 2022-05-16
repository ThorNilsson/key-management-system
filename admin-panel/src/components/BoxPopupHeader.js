
import { DialogTitle, IconButton, Typography } from "@mui/material"
import { CloseRounded } from "@mui/icons-material"

export default function BoxPopupHeader({ close, title, ...props }) {
	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...props}>
            <Typography variant="h3">{title}</Typography>
			<IconButton
				aria-label="close"
				onClick={close}
				sx={{
					position: "absolute",
					right: 8,
					top: 8,
				}}
			>
				<CloseRounded />
			</IconButton>
		</DialogTitle>
	)
}
