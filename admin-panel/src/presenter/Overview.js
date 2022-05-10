import { useList } from "react-firebase-hooks/database"
import { resolvePath, useLocation, useParams, useNavigate } from 'react-router-dom';
import { ref } from 'firebase/database';
import { db } from "../api/firebase"

import OverView from "../view/OverView";

export default function OverviewPresenter() {
    const { boxId } = useParams()
    const {pathname } = useLocation()
    const navigate = useNavigate()

    const [keys, loading, error] = useList(ref(db, `keyboxes/${boxId}/keys`))

    if(error) return <div>Something went wrong</div>

    const slots = new Array(16).fill(null)

    keys.forEach(key => {
        const k = {...key.val(), id: key.key}
        slots[k.preferredKeySlot] = k
    })

    const editKey = id => {
        console.log(id)
        if(!id) return
        navigate(resolvePath(`key/${id}/edit`, pathname))
    }


    return (
        <OverView keys={slots} loading={loading} editKey={editKey} />
    )
}