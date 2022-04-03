import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './NavBar.css'

const NavBar = () => {
  const history = useHistory();
  const params = useParams();

  const redirectHome = (e) => {
    e.preventDefault();
    if (params.surfboardId) return history.push('/surfboards/');
    else return window.location.reload(false);
  };

  return (
    <nav>
      <button type='button' onClick={(e) => redirectHome(e)} className='appName'>🏄 HI Surf</button>
      <ProfileButton />
    </nav>
  );
}

export default NavBar;
