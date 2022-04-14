import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

function EventsView(props) {
    return (
        <div>   
            <h1 className={"mt-3"}>Logs:</h1>
            {props.keys.map(key => {
                return (
                    <Card className={"mb-4"} style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{key.message}</Card.Title>
                            <ul>
                                <li>Time: {convertTime(key.time)} </li>
                                <li>Booking ID: {key.bookingId}</li>
                                <li>Name: {key.name}</li>
                                <li>UserID: {key.userId}</li>
                            </ul>
                        </Card.Body>
                    </Card>
                );
            })}
        </div>
    );
}

function convertTime(time) {
    let unix_timestamp = time;
    var date = new Date(unix_timestamp * 1000);
    var years = date.getFullYear();
    var months = date.getMonth() + 1;
    var days = date.getDate();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = days + '/' + months + '-' + years + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}
export default EventsView;