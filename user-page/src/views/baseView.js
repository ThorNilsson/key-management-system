import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import logo from '../logo-box.png'
function BaseView(props) {
    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    bgcolor: '#dddddd',
                    height: '10vh',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                <img src={logo} className='logo' onClick={() => props.navigate(`/login`)}></img>
                <div className='headerText'>Retrieve Key from Box</div>
                <Button size='small' sx={{ mt: 0.5, mr: '10px', color: 'white', backgroundColor: '#d43d3f', ':hover': { backgroundColor: '#9e2e2e' } }} variant='contained' onClick={props.logOut}>Sign Out</Button>
            </Box>
            <div className='topbar' >
            </div>
            <div ref={props.mapContainer} className="map-container"></div>
            <div className='bottombar'>
                <div className='howitworks'>
                    <span className="material-icons">&#xe887;</span>
                    How it works</div>
                <div className='contact'><span className="material-icons">&#xf22e;</span>Contact Homeowner</div>
            </div>
        </div>
    );
}

export default BaseView;