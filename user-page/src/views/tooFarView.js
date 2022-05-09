function TooFarView(props) {
    return (
        <div className='topbar1' >
            <div className='topbar_text1'>You are {props.dist} meters from the box</div>
            <div className='topbar_text2'>Get closer to open it!</div>
        </div>
    )
}

export default TooFarView