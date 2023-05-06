import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  // console.log (isLoaded) 
  const sessionUser = useSelector(state => state.session.user);
  // console.log (session)

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
        
        </>
        
      )}
    </ul>
  );
}

export default Navigation;