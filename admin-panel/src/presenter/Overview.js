import { useList } from "react-firebase-hooks/database"
import { resolvePath, useLocation, useParams, useNavigate } from "react-router-dom"
import { onValue, ref } from "firebase/database"
import { db } from "../api/firebase"

import OverView from "../view/OverView"
import { useEffect, useState } from "react"

export default function OverviewPresenter() {
	const { boxId } = useParams()
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const [numberOfKeySlots, setNumberOfKeySlots] = useState()
	const [keys, loading, error] = useList(ref(db, `keyboxes/${boxId}/keys`))

	useEffect(() => {
		const numberOfKeySlotsRef = ref(db, `keyboxes/${boxId}/info/nrOfKeySlots`)
		const unsub = onValue(numberOfKeySlotsRef, snapshot => {
			setNumberOfKeySlots(snapshot.val())
		})
		return unsub
	})

	if (error) return <div>Something went wrong</div>

    let slots = []

    if(numberOfKeySlots) {
        slots = new Array(numberOfKeySlots).fill(null)
        keys.forEach(key => {
            const k = { ...key.val(), id: key.key }
            slots[k.preferredKeySlot - 1] = k
        })
    }

	const editKey = ({id, preferredKeySlot}) => {
		console.log(id)
		if (!id) return navigate(resolvePath(`key/new/${preferredKeySlot}`, pathname))
		navigate(resolvePath(`key/${id}/edit`, pathname))
	}

	return <OverView keys={slots} loading={loading || !numberOfKeySlots} editKey={editKey} />
}
