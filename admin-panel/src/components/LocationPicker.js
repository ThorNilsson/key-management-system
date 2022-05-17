import React from "react"
import { useEffect, useRef } from "react"
import "mapbox-gl/dist/mapbox-gl.css"
import mapboxgl from "mapbox-gl"
import { Box } from "@mui/material"

mapboxgl.accessToken = "pk.eyJ1Ijoia2Fyb2xpbmE5OSIsImEiOiJjbDMyeHppcjcwZnI1M2twNWxnaGl5NmFvIn0.dZXqbPaLweJM5EoF_maJwQ"
const pinAsSvgString =
	'<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><path d="M12,2c-4.2,0-8,3.22-8,8.2c0,3.18,2.45,6.92,7.34,11.23c0.38,0.33,0.95,0.33,1.33,0 C17.55,17.12,20,13.38,20,10.2C20,5.22,16.2,2,12,2z M12,12c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2 C14,11.1,13.1,12,12,12z" enable-background="new"/></g></svg>'

export default function LocationPicker({ lng, lat, setLng, setLat, sx, ...props }) {
	const mapContainer = useRef(null)
	const map = useRef(null)
	const marker = useRef(null)

	const setMarker = (lng, lat) => {
		if (marker.current) return marker.current.setLngLat([lng, lat])

		const div = document.createElement("div")
		div.innerHTML = pinAsSvgString

		marker.current = new mapboxgl.Marker(div).setOffset([0, -12]).setLngLat([lng, lat]).addTo(map.current)
	}

	const createMap = (lng, lat, zoom) => {
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [lng, lat],
			zoom,
		})
		map.current.on("click", handleClick)
	}

	const handleClick = data => {
        setMarker(data["lngLat"].lng, data["lngLat"].lat)
		setLng(data["lngLat"].lng)
		setLat(data["lngLat"].lat)
    }

	useEffect(() => {
		if (map.current) return

		if (!lng || !lat) {
			navigator.geolocation.getCurrentPosition(
				({ coords }) => createMap(coords.longitude, coords.latitude, 5),
				() => createMap(0, 0, -5)
			)
		} else {
			createMap(lng, lat, 8)
			setMarker(lng, lat)
		}
	})

	return <Box ref={mapContainer} style={{ height: 400 }} className="map-container" sx={{...sx, borderRadius: "4px"}} {...props} />
}
