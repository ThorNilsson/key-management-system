import React, { useEffect, useState } from 'react';
import TimeUntilView from '../views/timeUntilView';
function BeforeAccess(props) {
    const [timeLeft, setTimeLeft] = useState(props.model.getTimeUntilAccess());
    
    useEffect(() => {
        setInterval(() => setTimeLeft(props.model.getTimeUntilAccess()), 3000);
    });

    return (
        <div>
            <TimeUntilView date={timeLeft} return={false}/>
        </div>
    );
}

export default BeforeAccess;