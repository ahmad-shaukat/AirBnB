import React, { useState } from "react"
import { useRef } from "react";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import * as sessionActions from '../../store/session'
import "./Navigation.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ProfileButton({ user }) {
    const [showMenu, setShowMenu] = useState(false)
    console.log(showMenu)
    const dispatch = useDispatch()
    const ulRef = useRef()

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
              setShowMenu(false);
            }
          };

        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }

    const ulDropDown = "profile-dropdown" + (showMenu ? "" : " hidden")
    console.log(ulDropDown)
    


    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.logout())

    }
    return (
        <>
            <button onClick={openMenu}><i class="fa-solid fa-user"></i></button>
            <ul className={ulDropDown} ref={ulRef}>
                <li>{user.username}</li>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
                <li><button onClick={logout}>Log Out</button></li>
            </ul>
        </>
    )
}

export default ProfileButton
