import { onValue } from "firebase/database"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { db } from "../../api/firebase"
import { ref, set, get } from "firebase/database"
import KeyFormView from "../../view/key/FormView"
import NewKeyView, { NFC_SCAN_STEPS } from "../../view/key/NewView"
import useTitle from "../../hooks/useTitle"

let nfcUnsub

export default function NewKeyPresenter() {
    useTitle("New key")
	const { boxId, preferredKeySlot } = useParams()
	const navigate = useNavigate()

	const [currentStep, setCurrentStep] = useState(0)
	const [nfcScanStep, setNfcScanStep] = useState()

	const [uid, setUid] = useState()
	const [roomName, setRoomName] = useState("")
	const [roomDescription, setRoomDescription] = useState("")
	const [defaultCheckInTime, setDefaultCheckInTime] = useState("")
	const [defaultCheckOutTime, setDefaultCheckOutTime] = useState("")
	const [roomLongitude, setRoomLongitude] = useState("")
	const [roomLatitude, setRoomLatitude] = useState("")
	const [roomImage, setRoomImage] = useState("")

	const handleNfcUpdate = snapshot => {
		const data = snapshot.val()
		switch (data) {
			case "wating for tag":
				setNfcScanStep(NFC_SCAN_STEPS.WAITING_FOR_NFC_SCAN)
				return
			case "tag sent":
				setNfcScanStep(NFC_SCAN_STEPS.NFC_SCANNED)
				const uidRef = ref(db, "keyboxes/" + boxId + "/accessingBooking/uid")
				get(uidRef).then(snapshot => {
					setUid(snapshot.val())
					setCurrentStep(2)
					nfcUnsub()
				})
				return
            default:
                console.error("Unknown status: ", data)
		}
	}

	const startScanProcess = async () => {
		setCurrentStep(1)

		setNfcScanStep(NFC_SCAN_STEPS.LOADING)
		try {
			const accessBookingRef = ref(db, `keyboxes/${boxId}/accessingBooking`)
			await set(accessBookingRef, { action: "getUid" })

			setNfcScanStep(NFC_SCAN_STEPS.WAITING_FOR_BUTTON_PRESS)
			const actionRef = ref(db, `keyboxes/${boxId}/accessingBooking/status`)
			nfcUnsub = onValue(actionRef, handleNfcUpdate)
		} catch (error) {
			alert("Something went wrong " + error.message)
		}
	}

	const save = () => {
		const keyRef = ref(db, `keyboxes/${boxId}/keys/${uid}`)
		set(keyRef, {
			name: roomName,
			description: roomDescription,
			longitude: roomLongitude,
			latitude: roomLatitude,
			image: roomImage,
			defaultCheckInTime,
			defaultCheckOutTime,
			keySlot: 0,
			preferredKeySlot: Number(preferredKeySlot),
		})
			.then(() => navigate(`/${boxId}`))
			.catch(error => alert("Something went wrong " + error.message))
	}

	return (
		<NewKeyView
			currentStep={currentStep}
			nfcScanStep={nfcScanStep}
			back={() => navigate(`/${boxId}`)}
			startScanProcess={startScanProcess}
			uid={uid}
			save={save}
		>
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
		</NewKeyView>
	)
}
