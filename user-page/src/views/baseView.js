function BaseView(props) {
    return (
        <div>
            <div className='header'>
                <p>Retrieve Key from Box</p>
            </div>
            <div className='topbar' >
                {/* {props.element[0]} */}
            </div>
            <div ref={props.mapContainer} className="map-container"></div>
            <div className='bottombar'>
                <div className='howitworks'>
                    <span className="material-icons">&#xe887;</span>
                    How it works</div>
                <div className='contact'><span className="material-icons">&#xf22e;</span>Contact Homeowner</div>
            </div>
            {/* {props.element[1]} */}
        </div>
    );
}

export default BaseView;