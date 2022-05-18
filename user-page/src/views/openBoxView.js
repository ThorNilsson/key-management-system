import RadioButtonCheckedRounded from "@mui/icons-material/RadioButtonCheckedRounded"
import {Typography} from "@mui/material"
function StateView(props) {
    return (
        <>
            <div className='topbar1' >
                <Typography variant="h3" sx={{mt: 6}} align="center" color={'#616161'}>{props.topText}</Typography>
                <Typography variant="h2" sx={{mt: 6}} align="center" color={'#616161'}>{props.bottomText}</Typography>
            </div>
            <div className="divOverMapContainer">
                <div className="divOverMap">
                    <div className="lockIcon">
                        {props.pressed ?
                            <RadioButtonCheckedRounded
                                sx={{
                                    fontSize: 100,
                                    animation: `iconPulse 1000ms infinite ease-in-out`,
                                    "@keyframes iconPulse": {
                                        "0%": {
                                            transform: "scale(1)",
                                        },
                                        "50%": {
                                            transform: "scale(1.1)",
                                        },
                                        "100%": {
                                            transform: "scale(1)",
                                        },
                                    },
                                }}
                                color="primary" />
                            : <img style={{width: "100px"}} src={props.icon}></img>}
                        {props.button ? <div className="openButton" onClick={e => props.action()}>OPEN</div> :
                            props.pressed ? <div className='pressBlue'>Press the blue button on the box!</div> :
                                <div className='retrieveKey'>{props.overMap}</div>}
                    </div>
                </div>
            </div>
        </>
    )

}


export default StateView;