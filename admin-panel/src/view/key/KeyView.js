import CircularProgress from "@mui/material/CircularProgress"
import DialogContent from "@mui/material/DialogContent"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import DialogActions from "@mui/material/DialogActions"
import CardMedia from "@mui/material/CardMedia"
import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"

import BoxPopupHeader from "../../components/BoxPopupHeader"

import grey from '@mui/material/colors/grey';

import ArrowForwardIosRounded from "@mui/icons-material/ArrowForwardIosRounded"
import ImageRounded from "@mui/icons-material/ImageRounded"
import KeyRounded from "@mui/icons-material/KeyRounded"
import moment from "moment";

export default function KeyView({edit, close, loading, info, release, counter, access}) {
    if (loading) return <CircularProgress/>

    return (
        <>
            <BoxPopupHeader title={`Key for ${info.name}`} close={close}/>
            <DialogContent sx={{width: 400}}>
                {info.image && info.image !== "" ? (
                    <CardMedia component="img" alt="No image" height="140" image={info.image}/>
                ) : (
                    <Paper sx={{backgroundColor: grey[200], mb: 3}}>
                        <Stack justifyContent="center" alignItems="center" sx={{minHeight: 140}}>
                            <ImageRounded sx={{fontSize: 80}}/>
                        </Stack>
                    </Paper>
                )}
                <Typography variant="body1" sx={{mb: 1}}>
                    {info.description}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={release} disabled={info.keySlot !== info.preferredKeySlot} variant="contained"
                        color="error" endIcon={<KeyRounded/>}>
                    {
                        info.keySlot !== info.preferredKeySlot ?
                            ("Key Not in box")
                            :
                            (counter > 0 ? ("Take key " + counter) : (access.keyId === info.preferredKeySlot ? "Key taken" : "Release key"))
                    }
                </Button>
                <Button onClick={edit} variant="outlined" endIcon={<ArrowForwardIosRounded/>}>
                    Edit key
                </Button>
            </DialogActions>
        </>
    )
}
