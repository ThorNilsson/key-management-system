import { Button, CircularProgress, DialogActions, DialogContent } from "@mui/material"
import { Typography } from "@mui/material"
import BoxPopupHeader from "../../components/BoxPopupHeader"

export default function EditKeyView({ children, save, name, close, back, uid, loading }) {
	return (
		<>
			<BoxPopupHeader title={`Edit key for ${name}`} close={close} back={back} />
			{loading ? (
				<CircularProgress />
			) : (
				<>
					<DialogContent>
						<Typography variant="body1">NFC uid: {uid}</Typography>
						{children}
					</DialogContent>
					<DialogActions>
						<Button onClick={save} variant="contained">
							Update
						</Button>
					</DialogActions>
				</>
			)}
		</>
	)
}
