import { ref, get, onValue, child, query, orderByChild, limitToLast } from "firebase/database"
import { db } from "../firebase"
import BaseView from '../views/baseView'
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fyb2xpbmE5OSIsImEiOiJjbDFvejYxOGMwOGdzM2NucXB3bWk4dzB0In0.O_nYe5G8ZDN_jc6B6dT1aQ';

function Base(props) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(15);

    useEffect(() => {
        const starCountRef = ref(db, 'keyboxes/' + props.keyboxId + '/info');
        console.log("bookingID"+props.keyboxId)
        get(starCountRef).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                const data = snapshot.val();
                if (map.current) return; // initialize map only once
                map.current = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: 'mapbox://styles/mapbox/light-v10',
                    center: [data.longitude, data.latitude],
                    zoom: zoom
                });
                console.log(data.longitude)
                const el = document.createElement('div');
                el.style.backgroundImage = `url(https://cdn.discordapp.com/attachments/955491126272458772/961627183594487859/Untitled_Artwork.png)`;
                el.style.width = `50px`;
                el.style.height = `50px`;
                el.style.backgroundSize = '100%';

                new mapboxgl.Marker(el
                ).setLngLat([data.longitude, data.latitude]).setOffset([0, -25])
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
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);




    return (
        <div>
            <BaseView mapContainer={mapContainer} />
        </div>
    );
}

export default Base;