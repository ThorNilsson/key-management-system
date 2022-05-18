import {Typography} from "@mui/material"
function TooFarView(props) {
    return (
        <div className='topbar1' >
            <Typography variant="h3" sx={{mt: 6}} align="center" color={'#616161'}>You are {props.dist} meters from the box</Typography>
            <Typography variant="h2" sx={{mt: 6}} align="center" color={'#616161'}>{props.description}</Typography>
        </div>
    )
}

export default TooFarView