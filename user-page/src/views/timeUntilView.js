import { Typography } from "@mui/material"
function TimeUntilView(props) {
    return (
        <>
            <div className='topbar1' >
                <Typography variant="h3" sx={{ mt: 6 }} align="center" color={'#616161'}>{!props.return ? 'Access to key granted in' : 'Return key within'}</Typography>
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
                            <img src={props.icon} alt='kmsicon'></img>
                            <Typography variant="h3" sx={{ mt: 6 }} align="center" color={'#616161'}>To return, hold the key-tag against the door</Typography>
                        </div>
                    </div>
                </div>
                : <div></div>}
        </>
    )
}

export default TimeUntilView