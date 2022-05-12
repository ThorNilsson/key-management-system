import { Button, CircularProgress, DialogContent, Stack } from "@mui/material"
import { Typography } from "@mui/material";
import BoxPopupHeader from "../../components/BoxPopupHeader";

export default function EditKeyView({ children, save, name, close, uid, loading }) {
	return (
		<>
            <BoxPopupHeader title={`Edit key for ${name}`} close={close} />
            <DialogContent>
                <Typography variant="body1">NFC uid: {uid}</Typography>
                {loading ? <CircularProgress /> : children}
                <Stack direction="row" spacing={2}>
                    <Button onClick={save} fullWidth variant="contained">Update</Button>
                </Stack>
            </DialogContent>
		</>
	)
}
