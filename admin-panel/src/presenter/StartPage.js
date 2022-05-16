import { getAuth } from "firebase/auth"
import { useState, useEffect } from "react"
import { useListVals } from "react-firebase-hooks/database"
import { ref } from "firebase/database"
import { db } from "../api/firebase"
import { get } from "firebase/database"

import { useNavigate } from "react-router-dom"

import StartPageView from "../view/StartPageView"
import useTitle from "../hooks/useTitle"

export default function StartPagePresenter() {
    useTitle("Start page")
	const navigate = useNavigate()
	const { currentUser } = getAuth()

	const [boxes, setBoxes] = useState([])
    const [boxesError, setBoxesError] = useState()
    const [loading, setLoading] = useState(true)
	const [boxIds, , boxIdsError] = useListVals(ref(db, `users/${currentUser.uid}/boxes`))

	// Fetch boxes
	useEffect(() => {
		if (!boxIds || boxIdsError) return

        if(boxIds.length === 0) return setLoading(false)

		const promises = boxIds.map(id => get(ref(db, "keyboxes/" + id + "/info")))
		Promise.all(promises)
			.then(data => {
                setBoxes(data.map((snap, i) => ({ ...snap.val(), id: boxIds[i] })))
                setLoading(false)
            })
			.catch(error => console.error(error))
	}, [boxIds, boxIdsError])

    if(boxIdsError || boxesError) return <div>Something went wrong</div>


	return <StartPageView navigate={navigate} boxes={boxes} loading={loading} />
}
