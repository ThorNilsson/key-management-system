import React, { useEffect, useState } from 'react';
import TimeUntilView from '../views/timeUntilView';
function BeforeAccess(props) {

    const [timeLeft, setTimeLeft] = useState(getTimeUntilAccess(props.startTime));
    
    useEffect(() => {
        setInterval(() => setTimeLeft(getTimeUntilAccess(props.startTime)), 3000);
    },[]);

    return (
        <div>
            <TimeUntilView date={timeLeft} return={false}/>
        </div>
    );
}

function getTimeUntilAccess(startTime) {
    let difference = startTime - Date.now();
    let timeLeft = {};
    if (difference > -7000) {
        startTime = difference;
    }
    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
        };
    }
    return timeLeft;
}

export default BeforeAccess;