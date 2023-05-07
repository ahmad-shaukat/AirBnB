import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormModal";
import * as sessionActions from "./store/session";
import SignupFormPage from "./components/SignupFormModal";
import Navigation from './components/Navigation'
import SpotBrowser from "./components/Spots";
import SpotDetail from "./components/Spots/SpotDetail";
import CreateSpotForm from "./components/Spots/CreateSpot";
import ManageSpotsFunction from "./components/Spots/ManageSpots";
import MainComponent from "./components/PostReview";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path='/'><SpotBrowser /></Route>
        <Route exact path = '/spots/current'> <ManageSpotsFunction /> </Route>
        <Route exact path ='/spots/add/newspot'> <CreateSpotForm /></Route> 
        <Route exact path='/spots/:spotId'> <SpotDetail /></Route>
        <Route exact path='/hello/test'> <MainComponent/></Route>
        </Switch>}
    </>
  );
}

export default App;