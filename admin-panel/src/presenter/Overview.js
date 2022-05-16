import { useList } from "react-firebase-hooks/database"
import { useParams } from "react-router-dom"
import { onValue, ref } from "firebase/database"
import { db } from "../api/firebase"

import OverView from "../view/OverView"
import { useEffect, useState } from "react"
import useRelativeNavigation from "../hooks/useRelativeNavigation"
import useTitle from "../hooks/useTitle"

export default function OverviewPresenter() {
    useTitle("Overview")
	const { boxId } = useParams()
    const relativeNavigate = useRelativeNavigation()
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
		if (!id) return relativeNavigate(`key/new/${preferredKeySlot}`)
		relativeNavigate(`key/${id}`)
	}

	return <OverView keys={slots} loading={loading || !numberOfKeySlots} editKey={editKey} />
}
