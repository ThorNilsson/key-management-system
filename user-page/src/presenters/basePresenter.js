import { ref, get } from "firebase/database"
import { db } from "../firebase"
import BaseView from '../views/baseView'
import React, { useRef, useEffect, useState } from 'react';
/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from "!mapbox-gl"
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom"
mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fyb2xpbmE5OSIsImEiOiJjbDFvejYxOGMwOGdzM2NucXB3bWk4dzB0In0.O_nYe5G8ZDN_jc6B6dT1aQ';

function Base() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const zoom = 15;
    const auth = getAuth()
    const bookingId = window.location.href.split('/')[4]
    const [keyboxId, setKeyboxId] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        if (auth.currentUser) {
            get(ref(db, 'guests/' + auth.currentUser.email.replace('.', '') + '/' + bookingId)).then((snapshot) => {
                const data = snapshot.val();
                setKeyboxId(data.keyboxId)
            }).catch((error) => {
                console.error(error);
            });
        } else {
            navigate(`/login`)
        }
    },);

    useEffect(() => {
        if (keyboxId) {
            const starCountRef = ref(db, 'keyboxes/' + keyboxId + '/info');
            get(starCountRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    if (map.current) return; // initialize map only once
                    map.current = new mapboxgl.Map({
                        container: mapContainer.current,
                        style: 'mapbox://styles/mapbox/light-v10',
                        center: [data.longitude, data.latitude],
                        zoom: zoom
                    });
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

                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [keyboxId]);


    const logOut = () => {
        signOut(auth)
    }

    return (
        <div>
            <BaseView mapContainer={mapContainer} logOut={logOut} navigate={navigate} />
        </div>
    );
}

export default Base;