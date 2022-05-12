import { Button, DialogContent, Stack } from "@mui/material"
import { Typography } from "@mui/material";
import BoxPopupHeader from "../../components/BoxPopupHeader";

export default function EditKeyView({ children, save, name, close, uid }) {
	return (
		<>
            <BoxPopupHeader title={`Edit key for ${name}`} close={close} />
            <DialogContent>
                <Typography variant="body1">NFC uid: {uid}</Typography>
                {children}
                <Stack direction="row" spacing={2}>
                    <Button onClick={() => save(true)} fullWidth variant="contained">Update and return</Button>
                    <Button onClick={save} fullWidth variant="text">Update</Button>
                </Stack>
            </DialogContent>
		</>
	)
}
