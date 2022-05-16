import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import EditBoxView from "../../view/box/EditView"

import { ref, set, onValue } from "firebase/database"
import { db } from "../../api/firebase"
import { getAuth } from "firebase/auth"

let lastSyncedData

export default function EditBoxPresenter() {
	const auth = getAuth()
	const [color, setColor] = useState("")
	const [description, setDescription] = useState("")
	const [image, setImage] = useState("")
	const [latitude, setLatitude] = useState("")
	const [longitude, setLongitude] = useState("")
	const [name, setName] = useState("")
	const [keySlots, setKeySlots] = useState(-1)
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	const { boxId } = useParams()
	useEffect(() => {
		const keyRef = ref(db, `keyboxes/${boxId}/info`)
		const unsub = onValue(keyRef, snapshot => {
			const data = snapshot.val()
			lastSyncedData = data
			setColor(data.color)
			setDescription(data.description)
			setImage(data.image)
			setLatitude(data.latitude)
			setLongitude(data.longitude)
			setName(data.name)
			setKeySlots(data.nrOfKeySlots)
			setLoading(false)
		})

		return () => unsub()
	}, [boxId])

	const handleSubmit = () => {
		set(ref(db, "keyboxes/" + boxId + "/info/"), {
			...lastSyncedData,
			color,
			description,
			image,
			latitude,
			longitude,
			name,
			nrOfKeySlots: keySlots,
		})
			.then(() => navigate("/" + boxId))
			.catch(error => alert("Something went wrong " + error.message))
	}

	const deleteBox = () => {
		if (window.confirm('are u sure?')==true) {
			set(ref(db, 'users/' + auth.currentUser.uid + '/boxes/' + boxId), null)
				.then(() => navigate("/" + boxId))
				.catch(error => alert("Something went wrong " + error.message))
		}
	}

	return (
		<EditBoxView
			close={() => navigate("/" + boxId)}
			color={color}
			setColor={setColor}
			description={description}
			setDescription={setDescription}
			image={image}
			setImage={setImage}
			latitude={latitude}
			setLatitude={setLatitude}
			longitude={longitude}
			setLongitude={setLongitude}
			name={name}
			setName={setName}
			keySlots={keySlots}
			setKeySlots={setKeySlots}
			handleSubmit={handleSubmit}
			loading={loading}
			deleteBox={deleteBox}
		/>
	)
}
