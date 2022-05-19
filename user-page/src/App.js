import './App.css';
import Base from './presenters/basePresenter';
import { LoginPresenter } from './presenters/logInPresenter';
import StartPagePresenter from './presenters/startPage';
import ViewPresenter from './presenters/viewPresenter';
import { Route, Routes } from "react-router-dom"


//import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPresenter />} />
        <Route path="/startpage" element={<StartPagePresenter />} />
        <Route path="/booking/:bookingId" element={
          <div>
            <Base />
            <ViewPresenter />
          </div>
        } />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  )
}


export default App;
