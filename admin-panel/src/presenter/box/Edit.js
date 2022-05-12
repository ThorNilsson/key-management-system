import { useParams } from "react-router-dom";
import EditBoxView from "../../view/box/EditView";

import { useEffect } from "react";

import { ref, onValue } from "firebase/database";
import { db } from "../../api/firebase";



export default function EditBoxPresenter() {
    const {boxId} = useParams()
    useEffect(() => {
		const keyRef = ref(db, `keyboxes/${boxId}/info`)
		const unsub = onValue(keyRef, snapshot => {
            const data = snapshot.val()
            console.log(data)
        })

        return () => unsub()
	}, [boxId])
  return <EditBoxView />
}
