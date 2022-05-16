import * as React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import EditBoxView from "../../view/box/EditView";

import { useEffect } from "react";

import { ref, set, onValue } from "firebase/database";
import { db } from "../../api/firebase";


export default function EditBoxPresenter() {
  const [color, setColor] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState('');
  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLongitude] = React.useState('');
  const [name, setName] = React.useState('');
  const [keySlots, setKeySlots] = React.useState('');
  const [open, setOpen] = React.useState('');
  const navigate = useNavigate();

  const { boxId } = useParams()
  useEffect(() => {
    const keyRef = ref(db, `keyboxes/${boxId}/info`)
    const unsub = onValue(keyRef, snapshot => {
      const data = snapshot.val()
      setColor(data.color)
      setDescription(data.description)
      setImage(data.image)
      setLatitude(data.latitude)
      setLongitude(data.longitude)
      setName(data.name)
      setKeySlots(data.nrOfKeySlots)
      setOpen(data.open)
      console.log(data)
    })

    return () => unsub()
  }, [boxId])

  const handleSubmit = () => {
		set(ref(db, 'keyboxes/' + boxId + '/info/'
		), {
			color: color,
			description: description,
			image: image,
			latitude: latitude,
			longitude: longitude,
			name: name,
			nrOfKeySlots: keySlots,
			open: open
		}).then(() => navigate("/" + boxId)).catch(error => alert("Something went wrong " + error.message))
	}

  return <EditBoxView color={color} setColor={setColor} 
    description={description} setDescription={setDescription} 
    image={image} setImage={setImage}
    latitude={latitude} setLatitude={setLatitude}
    longitude={longitude} setLongitude={setLongitude}
    name={name} setName={setName}
    keySlots={keySlots} setKeySlots={setKeySlots}
    open={open} setOpen={setOpen}
    handleSubmit={handleSubmit}/>
}
