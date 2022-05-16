import { useLocation, useNavigate, resolvePath, useParams } from "react-router-dom"
import KeyView from "../../view/key/KeyView"
import { onValue, ref, set } from "firebase/database"
import { db } from "../../api/firebase"

import { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import moment from 'moment';

export default function KeyPresenter() {
	const { boxId, keyId } = useParams()
	const { currentUser } = getAuth()
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const [loading, setLoading] = useState(true)
	const [name, setName] = useState("")

	useEffect(() => {
		const keyRef = ref(db, `keyboxes/${boxId}/keys/${keyId}/name`)
		const handleValue = snapshot => {
			setName(snapshot.val())
			setLoading(false)
		}
		const unsub = onValue(keyRef, handleValue)

		return () => unsub()
	}, [boxId, keyId])

	const releaseKey = () => {
		const accessRef = ref(db, `keyboxes/${boxId}/accessingBooking`)
		set(accessRef, {
			action: "getKeyByAdmin",
			userId: currentUser.uid,
			accessRequested: moment().unix(),
			accessExpired: moment().add(1, "minutes").unix(),
			name: "Olle",
			keyId: keyId,
		})
	}

	return (
		<KeyView
			edit={() => navigate(resolvePath(`edit`, pathname))}
			close={() => navigate(resolvePath(`../../`, pathname))}
			loading={loading}
			name={name}
			release={releaseKey}
		/>
	)
}
