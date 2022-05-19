import React, { useEffect, useState } from 'react';
import TimeUntilView from '../views/timeUntilView';
import LockIcon from '../outline_lock_black_48dp.png'
function TimeUntilPresenter(props) {
    const [timeLeft, setTimeLeft] = useState(getTimeUntil(props.time));

    useEffect(() => {
        setInterval(() => setTimeLeft(getTimeUntil(props.time)), 30);
    });

    return (
        <div>
            <TimeUntilView date={timeLeft} return={props.return} button={true} action={props.openBox}
            icon={LockIcon} pressed={props.pressed}/>
        </div>
    );
    
}


function getTimeUntil(returnTime) {
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

export default TimeUntilPresenter;