function TimeUntilView(props) {
    return (
        <div className='topbar1' >
            <div className='topbar_text1'>{!props.return?'Access to key granted in':'Return key within'}</div>
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
    )
}

export default TimeUntilView