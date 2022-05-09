import React, { useEffect, useState } from 'react';
import TimeUntilView from '../views/timeUntilView';
function ReturnTimer(props) {
    const [timeLeft, setTimeLeft] = useState(props.model.getTimeUntilReturn());
    
    useEffect(() => {
        setInterval(() => setTimeLeft(props.model.getTimeUntilReturn()), 30);
    });

    return (
        <div>
            <TimeUntilView date={timeLeft} return={true}/>
        </div>
    );
}

export default ReturnTimer;