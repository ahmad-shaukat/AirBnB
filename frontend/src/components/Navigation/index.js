import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../assets/images/nav-logo.png'

function Navigation({ isLoaded }){
  // console.log (isLoaded) 
  const sessionUser = useSelector(state => state.session.user);
  // console.log (session)

  return (
    <ul className='nav-ul'>
      <li className='nav-li'>
        <NavLink exact to="/">
        <img src={logo} className='nav-logo'/>
        </NavLink>
      </li>
      {isLoaded && (
        <>
        <li>
          <ProfileButton user={sessionUser} className='profile-button' />
        </li>
        
        </>
        
      )}
    </ul>
  );
}

export default Navigation;