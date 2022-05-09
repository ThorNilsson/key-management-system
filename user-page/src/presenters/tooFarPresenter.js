import TooFarView from '../views/tooFarView';
import React, { useEffect, useState } from 'react';
function TooFar(props) {
    const [distance, setDistance] = useState(props.model.getDistanceToTarget());
    
    useEffect(() => {
        setInterval(() => setDistance(props.model.getDistanceToTarget()), 3000);
    });

    return (
        <div>
            <TooFarView dist={distance}/>
        </div>
    );
}

export default TooFar;