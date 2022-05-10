import React, { useEffect, useState } from 'react';
import BeforeAccess from "./beforeAccessPres";
import StateView from "../views/openBoxView";
import TooFarView from "../views/tooFarView";
import ReturnTimer from './returnTimerPres';
import TooFar from './tooFarPresenter';
import LockIcon from '../outline_lock_black_48dp.png'
import unLockIcon from '../outline_lock_open_black_48dp.png'
import Icon from '../successIcon.png'
import { ref, onValue } from 'firebase/database';
import { db } from "../firebase"

function ViewPresenter(props) {
    const [boxState, setBoxState] = useState(props.model.bosOpen);
    const [keyState, setKeyState] = useState(props.model.keyTaken);
    const [dist, setDist] = useState(props.model.distance);
    const [timeUntilReturn, settimeUntilReturn] = useState(props.model.timeUntilReturn);
    const [timeLeft, setTimeLeft] = useState(props.model.timeUntilAccess);


    useEffect(() => {
        
        
        const obs = () => {
            setBoxState(props.model.boxOpen)
            console.log(props.model.keyboxId)
            setKeyState(props.model.keyTaken)
            setDist(props.model.distance)
            settimeUntilReturn(props.model.timeUntilReturn)
            setTimeLeft(props.model.timeUntilAccess)
        };
        props.model.addObserver(obs)
        return () => props.model.removeObserver(obs);
    }, [props.model]);


    return (
        <div>
            {currentView(props.model)}
        </div>
    )
}

function currentView(model) {
    //console.log(model)
    if (model.timeUntilAccess > 0) {
        return (
            <BeforeAccess model={model} />
        )
    }
    if (model.timeUntilReturn > 0) {
        return (
            <ReturnTimer model={model} />
        )
    }
    if (model.distance > 10000000) {
        return (
            <TooFarView model={model} dist={model.distance} />
        )
    }
    if (!model.boxOpen && !model.keyTaken && model.distance != null) {
        console.log("Box is ready to be opened")
        const topText = `You are ${model.distance === undefined ? '0' : model.distance} meters from the box`
        const bottomText = 'Open Box!'

        return (
            <StateView button={true} key='open' action={() => model.changeStateOfBox()}
                topText={topText} bottomText={bottomText} icon={LockIcon} />
        )
    }
    if (model.boxOpen && !model.keyTaken) {
        console.log("opened")
        const topText = 'You have opened the box'
        const bottomText = 'Retrieve the indicated key!'
        const overMap = 'Retrieve Key'

        return (
            <StateView key='grabKey' action={() => model.changeStateOfKey()} 
            topText={topText} bottomText={bottomText} overMap={overMap} icon={unLockIcon}/>
        )
    }
    if (model.boxOpen && model.keyTaken) {
        console.log("key is taken")
        const topText = 'You have retrieved the key'
        const bottomText = 'Please close the door!'
        const overMap = 'Close Door'

        return (
            <StateView key='close' action={() => model.changeStateOfBox()}
            topText={topText} bottomText={bottomText} overMap={overMap}  icon={unLockIcon}/>
        )
    }
    if (!model.boxOpen && model.keyTaken) {
        console.log("success")
        const topText = `Rental Period ends in ${model.getTimeUntilReturn().days} days`
        const bottomText = 'Have a great stay!'
        const overMap = 'Success'

        return (
            <StateView key='success' action={() => model.setTimeUntilReturn()}
            topText={topText} bottomText={bottomText} overMap={overMap} icon={Icon}/>
        )
    }

    return <div className='topbar1'><div className='topbar_text2'>Loading...</div></div>
}


export default ViewPresenter