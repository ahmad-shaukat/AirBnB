import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormModal";
import * as sessionActions from "./store/session";
import SignupFormPage from "./components/SignupFormModal";
import Navigation from './components/Navigation'
import SpotBrowser from "./components/landingPage";
import SpotDetail from "./components/spotDetail/SpotDetail";
import CreateSpotForm from "./components/createSpot/CreateSpot";
import ManageSpotsFunction from "./components/manageSpot/ManageSpots";
import MainComponent from "./components/Modals";
import './app.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <div className="container">
    <div className="nav" >
      <Navigation isLoaded={isLoaded} />
    </div>

    <div className="main">
      {isLoaded && <Switch>
        <Route exact path='/'><SpotBrowser /></Route>
        <Route exact path = '/spots/current'> <ManageSpotsFunction /> </Route>
        <Route exact path ='/spots/add/newspot'> <CreateSpotForm /></Route> 
        <Route exact path='/spots/:spotId'> <SpotDetail /></Route>
        
        </Switch>}
    </div>
    </div>
    </>
  );
}

export default App;