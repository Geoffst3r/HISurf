import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './auth/ProfileButton';
import LoginModal from './LoginModal';
import SignUpModal from './SignupModal';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton />
      </li>
    )
  } else {
    sessionLinks = (
      <>
        <li>
          <LoginModal />
        </li>
        <li>
          <SignUpModal />
        </li>
      </>
    )
  }
  return (
    <nav>
      <NavLink to='/surfboards'>
          <button className='appName'>HI Surf</button>
      </NavLink>
      <ul>
        {sessionLinks}
      </ul>
    </nav>
  );
}

export default NavBar;
