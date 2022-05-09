function StateView(props) {
    return (
        <>
            <div className='topbar1' >
                <div className='topbar_text1'>{props.topText}</div>
                <div className='topbar_text2'>{props.bottomText}</div>
            </div>
            <div className="divOverMapContainer">
                <div className="divOverMap">
                    <div className="lockIcon">
                        <img src={props.icon} onClick={e => props.action()}></img>
                        {props.button ? <div className="openButton" onClick={e => props.action()}>OPEN</div> : <div className='retrieveKey'>{props.overMap}</div>}
                    </div>
                </div>
            </div>
        </>
    )

}


export default StateView;