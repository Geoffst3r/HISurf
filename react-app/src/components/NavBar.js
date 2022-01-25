import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SurfboardForm from "./SurfboardListings/SurfboardForm";
import { Modal } from '../context/Modal';
import { logout } from '../store/session';
import LoginModal from './LoginModal';
import SignUpModal from './SignupModal';
import './NavBar.css'

const NavBar = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [showListingModal, setShowListingModal] = useState(false);

  const log_out = async () => {
    await dispatch(logout());
  };

  const callSetter = () => {
      setShowListingModal(false);
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li>
            <button className="add-listing" onClick={() => setShowListingModal(true)}>+New Listing</button>
        </li>
        <li>
            <button className="logout-profile-button" onClick={log_out}>Log Out</button>
        </li>
      </>
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
      <NavLink to='/surfboards/'>
          <button className='appName'>🏄</button>
      </NavLink>
      <ul>
        {sessionLinks}
      </ul>
      {showListingModal && (
          <Modal onClose={() => setShowListingModal(false)}>
              <SurfboardForm callSetter={callSetter} />
          </Modal>
      )}
    </nav>
  );
}

export default NavBar;
