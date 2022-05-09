import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import Base from './presenters/basePresenter'
import Model from './model';
import ViewPresenter from './presenters/viewPresenter';
import BeforeAccess from './presenters/beforeAccessPres';
function App() {
  let model = new Model();
  return (
    <div>
      {model.firebaseTest()}
      <Base model={model} />
      <ViewPresenter model={model}/>
    </div>
  )
}


export default App;
