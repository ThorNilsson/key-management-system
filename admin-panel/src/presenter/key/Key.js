import { useParams } from "react-router-dom"
import KeyView from "../../view/key/KeyView"
import { onValue, ref, set } from "firebase/database"
import { db } from "../../api/firebase"

import useRelativeNavigation from "../../hooks/useRelativeNavigation"

import useTitle from "../../hooks/useTitle"

import { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import moment from 'moment';

export default function KeyPresenter() {
    useTitle("View key")
	const { boxId, keyId } = useParams()
	const { currentUser } = getAuth()
    const relativeNavigate = useRelativeNavigation()
	const [loading, setLoading] = useState(true)
	const [info, setInfo] = useState({})

	useEffect(() => {
		const keyRef = ref(db, `keyboxes/${boxId}/keys/${keyId}`)
		const handleValue = snapshot => {
			setInfo(snapshot.val())
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
			edit={() => relativeNavigate("edit")}
			close={() => relativeNavigate("../../")}
			loading={loading}
			info={info}
			release={releaseKey}
		/>
	)
}
