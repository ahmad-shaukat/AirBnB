import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../assets/images/nav-logo.png'

function Navigation({ isLoaded }) {
  const [showNewSpot, setShowNewSpot] = useState(false)
  // console.log (isLoaded) 
  const sessionUser = useSelector(state => state?.session?.user);
  


  return (
    <ul className='nav-ul'>
      <li className='nav-li'>
        <NavLink exact to="/">
          <img src={logo} className='nav-logo' />
        </NavLink>
      </li>
      <div className='user-menu-create'>

      <div>
        {sessionUser ? <div className='crt-btn'>

          <NavLink to={'/spots/add/newspot'} className='add-spt-login-nav'>
            Add a Spot
          </NavLink>

        </div> : <div></div>}
      </div>

      {isLoaded && (
        <>
          

          <li>
            <ProfileButton user={sessionUser} className='profile-button' />
          </li>

        </>

      )}
      </div>
    </ul>
  );
}

export default Navigation;