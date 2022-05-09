import BaseView from '../views/baseView'
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fyb2xpbmE5OSIsImEiOiJjbDFvejYxOGMwOGdzM2NucXB3bWk4dzB0In0.O_nYe5G8ZDN_jc6B6dT1aQ';

function Base(props) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(props.model.targetLocation.lng);
    const [lat, setLat] = useState(props.model.targetLocation.lat);
    const [zoom, setZoom] = useState(15);


    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom
        });
        const el = document.createElement('div');
        el.style.backgroundImage = `url(https://cdn.discordapp.com/attachments/955491126272458772/961627183594487859/Untitled_Artwork.png)`;
        el.style.width = `50px`;
        el.style.height = `50px`;
        el.style.backgroundSize = '100%';

        new mapboxgl.Marker(el
        ).setLngLat([lng, lat]).setOffset([0, -25])
            .addTo(map.current);

        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        });
        map.current.addControl(geolocate);
        geolocate.on('geolocate', () => {
            console.log('A geolocate event has occurred.');
        });
        
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

    });

    return (
        <div>
            <BaseView mapContainer={mapContainer} />
        </div>
    );
}

export default Base;