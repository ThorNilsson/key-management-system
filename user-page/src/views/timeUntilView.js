import RadioButtonCheckedRounded from "@mui/icons-material/RadioButtonCheckedRounded"
import {Typography} from "@mui/material"
function TimeUntilView(props) {
    return (
        <>
            <div className='topbar1' >
                <Typography variant="h3" sx={{mt: 6}} align="center" color={'#616161'}>{!props.return ? 'Access to key granted in' : 'Return key within'}</Typography>
                <div className='time_left'>
                    <div className='time'>
                        <div className='time_amount'>{props.date.days}</div>
                        <div className='time_units'>days</div>
                        <div className='time_amount'>{props.date.hours}</div>
                        <div className='time_units'>hours</div>
                        <div className='time_amount'>{props.date.minutes}</div>
                        <div className='time_units'>minutes</div>
                    </div>
                </div>

            </div>
            {props.return ?
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
                                : <img src={props.icon}></img>}
                            {props.pressed ?
                                <div className='pressBlue'>Press the blue button on the box!</div> :
                                <div className="openButton" onClick={e => props.action()}>OPEN</div>}
                        </div>
                    </div>
                </div>
                : <div></div>}
        </>
    )
}

export default TimeUntilView