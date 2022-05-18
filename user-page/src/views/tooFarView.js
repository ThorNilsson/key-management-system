import {Typography} from "@mui/material"
function TooFarView(props) {
    return (
        <div className='topbar1' >
            {/* <div className='topbar_text1'>You are {props.dist} meters from the box</div>
            <div className='topbar_text2'>Get closer to open it!</div> */}
            <Typography variant="h3" sx={{mt: 6}} align="center" color={'#616161'}>You are {props.dist} meters from the box</Typography>
            <Typography variant="h2" sx={{mt: 6}} align="center" color={'#616161'}>{props.description}</Typography>
        </div>
    )
}

export default TooFarView