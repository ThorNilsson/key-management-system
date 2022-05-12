import { onValue, ref, set } from "firebase/database"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { db } from "../../api/firebase"
import EditKeyView from "../../view/key/EditView"
import KeyFormView from "../../view/key/FormView"


let lastReadData = {}

export default function EditKeyPresenter() {
	const { boxId, keyId } = useParams()
    const navigate = useNavigate()
	const [roomName, setRoomName] = useState("")
	const [roomDescription, setRoomDescription] = useState("")
	const [defaultCheckInTime, setDefaultCheckInTime] = useState("")
	const [defaultCheckOutTime, setDefaultCheckOutTime] = useState("")
	const [roomLongitude, setRoomLongitude] = useState("")
	const [roomLatitude, setRoomLatitude] = useState("")
	const [roomImage, setRoomImage] = useState("")

	useEffect(() => {
		const keyRef = ref(db, `keyboxes/${boxId}/keys/${keyId}`)
        const handleValue = snapshot => {
            const data = snapshot.val()
            setRoomName(data.name)
            setRoomDescription(data.description)
            setDefaultCheckInTime(data.defaultCheckInTime)
            setDefaultCheckOutTime(data.defaultCheckOutTime)
            setRoomLongitude(data.longitude)
            setRoomLatitude(data.latitude)
            setRoomImage(data.image)
            lastReadData = data
        }
		const unsub = onValue(keyRef, handleValue)

        return () => unsub()
	}, [boxId, keyId])

    const save = shouldExit => {
		const keyRef = ref(db, `keyboxes/${boxId}/keys/${keyId}`)
        set(keyRef, {
            ...lastReadData,
            name: roomName,
            description: roomDescription,
            longitude: roomLongitude,
            latitude: roomLatitude,
            image: roomImage,
            defaultCheckInTime,
            defaultCheckOutTime,
        }).then(() => {
            if(shouldExit) navigate(`/${boxId}`)
        }).catch(error => alert("Something went wrong " + error.message))
    }

	return (
        <EditKeyView save={save} name={roomName} close={() => navigate(`/${boxId}`)} uid={keyId}>
			<KeyFormView
				roomName={roomName}
				setRoomName={setRoomName}
				roomDescription={roomDescription}
				setRoomDescription={setRoomDescription}
				roomLongitude={roomLongitude}
				setRoomLongitude={setRoomLongitude}
				roomLatitude={roomLatitude}
				setRoomLatitude={setRoomLatitude}
				roomImage={roomImage}
				setRoomImage={setRoomImage}
                defaultCheckInTime={defaultCheckInTime}
                setDefaultCheckInTime={setDefaultCheckInTime}
                defaultCheckOutTime={defaultCheckOutTime}
                setDefaultCheckOutTime={setDefaultCheckOutTime}
			/>
        </EditKeyView>
	)
}
