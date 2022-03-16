import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
      <NavLink to='/surfboards/'>
        <button className='appName'>🏄 HI Surf</button>
      </NavLink>
      <ProfileButton />
    </nav>
  );
}

export default NavBar;
