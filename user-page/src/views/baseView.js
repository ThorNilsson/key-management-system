import Button from '@mui/material/Button';
function BaseView(props) {
    return (
        <div>
            <div className='header'>
                <p className='headerText' >Retrieve Key from Box</p>
                <Button size='small' sx={{ mt: 0.5, ml: '80%'}} onClick={props.logOut}>Sign Out</Button>
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