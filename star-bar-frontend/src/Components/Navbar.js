import React from 'react'
import {NavLink} from 'react-router-dom'

function Navbar(props){
    return(
        <ul>
            <NavLink to='/signup'>
                <li>Sign Up</li>
            </NavLink>
            <NavLink to='/login'>
                <li>Login</li>
            </NavLink>
            <NavLink to='/horoscopes'>
                <li>Horoscopes</li>
            </NavLink>
            <NavLink to='/favorites'>
                <li>Favorite Horoscopes</li>
            </NavLink>

        </ul>
    )
}

export default Navbar