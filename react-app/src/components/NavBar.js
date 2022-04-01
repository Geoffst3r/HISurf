import React from 'react';
import { useHistory } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './NavBar.css'

const NavBar = () => {
  const history = useHistory();

  const redirectHome = (e) => {
    e.preventDefault();
    history.push('/surfboards/');
    return window.location.reload(false);
  };

  return (
    <nav>
      <button type='button' onClick={(e) => redirectHome(e)} className='appName'>🏄 HI Surf</button>
      <ProfileButton />
    </nav>
  );
}

export default NavBar;
