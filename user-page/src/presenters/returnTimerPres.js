import React, { useEffect, useState } from 'react';
import TimeUntilView from '../views/timeUntilView';
function ReturnTimer(props) {
    const [timeLeft, setTimeLeft] = useState(getTimeUntilReturn(props.returnTime));
    
    useEffect(() => {
        setInterval(() => setTimeLeft(getTimeUntilReturn(props.returnTime)), 30);
    });

    return (
        <div>
            <TimeUntilView date={timeLeft} return={true}/>
        </div>
    );
}


function getTimeUntilReturn(returnTime) {
    let difference = returnTime - Date.now();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
        };
    }
    return timeLeft;
}

export default ReturnTimer;