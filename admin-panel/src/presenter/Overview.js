import { useList } from "react-firebase-hooks/database"
import { useParams } from 'react-router-dom';
import { ref } from 'firebase/database';
import { db } from "../api/firebase"

import OverView from "../view/OverView";

export default function OverviewPresenter() {
    const { boxId } = useParams()

    const [keys, loading, error] = useList(ref(db, `keyboxes/${boxId}/keys`))

    if(error) return <div>Something went wrong</div>

    console.log(keys)
    const slots = new Array(16).fill(null)

    keys.forEach(key => {
        const k = {...key.val(), id: key.key}
        slots[k.preferredKeySlot] = k
    })


    return (
        <OverView keys={slots} />
    )
}