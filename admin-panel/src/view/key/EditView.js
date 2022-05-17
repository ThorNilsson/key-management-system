import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import Typography from "@mui/material/Typography"
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
