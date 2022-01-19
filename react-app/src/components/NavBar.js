import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <LogoutButton />
      </li>
    )
  } else {
    sessionLinks = (
      <>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
      </>
    )
  }
  return (
    <nav>
      <NavLink to='/surfboards'>
          <button className='appName' >HI Surf</button>
      </NavLink>
      <ul>
        {sessionLinks}
      </ul>
    </nav>
  );
}

export default NavBar;
