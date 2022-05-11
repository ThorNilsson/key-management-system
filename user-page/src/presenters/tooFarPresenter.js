import TooFarView from '../views/tooFarView';
import React, { useEffect, useState, useRef } from 'react';
function TooFar(props) {
    const [dist, setDist] = useState();
    const locationWatchId = useRef(null);
    
    useEffect(() => {
        locationWatchId.current = navigator.geolocation.watchPosition((pos) => setDistanceToTarget(pos, props.lng,props.lat));
    });
    
    function setDistanceToTarget(pos, lng, lat) {
        var crd = pos.coords;
        var dis =  Math.round(distance(crd.latitude, crd.longitude, lat, lng) * 1000)
        console.log(crd.latitude)
        console.log(crd.longitude)
        setDist(dis);
    }

    return (
        <div>
            <TooFarView dist={dist}/>
        </div>
    );
}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function distance(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
}


export default TooFar;