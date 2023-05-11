import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './profilebutton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = `profile-dropdown ${showMenu ? "show" : "hidden"}  open-menu`;

  return (
    <>
      <div className="menu-container" onClick={openMenu} tabIndex="0" >

        <i className="fa-solid fa-bars"></i>
        <button onClick={openMenu} className="menu-butt">
          <i className="fa-solid fa-user fa-lg" style={{ color: 'white' }}></i>
        </button>

      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="user-info">
              <li>{user.userName}</li>
              <li>Hello{user.firstName} {user.lastName}</li>
              <li>{user.email}</li>
            </div>
            <div className="user-menu">

              <div className="new-spot-lnk">

                <NavLink to={'/spots/add/newspot'}>
                  Add New Spot
                </NavLink>
              </div>
              <div className="mng-spot-lnk">

              <NavLink to={'/spots/current'}>
                Manage Spots
              </NavLink>
              </div>
              

                <button onClick={logout} className="lgout-btn">Log Out</button>
              
            </div>

          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;