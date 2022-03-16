import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as sessionActions from '../store/session';
import SurfboardForm from "./SurfboardListings/SurfboardForm";
import { Modal } from '../context/Modal';
import LoginForm from './LoginModal/LoginForm';
import SignUpForm from './SignupModal/SignUpForm';
import './NavBar.css'

function ProfileButton() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showListingModal, setShowListingModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const listingsObj = sessionUser?.listings;
    const rentalsObj = sessionUser?.rentals;
    let listings;
    let rentals;
    if (listingsObj) listings = Object.values(listingsObj);
    if (rentalsObj) {
        let rentalsArr = Object.values(rentalsObj);
        rentals = rentalsArr.sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const callSetter = () => {
        setShowListingModal(false);
    };

    const closeLoginCallSetter = () => {
        setShowLoginModal(false);
    };

    const closeSignupCallSetter = () => {
        setShowSignupModal(false);
    };

    const signupFunc = () => {
        setShowSignupModal(true);
        setShowMenu(false);
    };

    const loginFunc = () => {
        setShowLoginModal(true);
        setShowMenu(false);
    };

    const onDemo = async () => {
        await dispatch(sessionActions.login('demo@aa.io', 'password'));
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            const signupButton = document.querySelector('.signupNav-button')
            const loginButton = document.querySelector('.loginNav-button')
            if (e.target === signupButton || e.target === loginButton) return;
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    if (sessionUser) {
        return (
            <>
                <button onClick={openMenu} className='profile-button'>
                    <i className="fa fa-bars" />
                    <i className="fas fa-user-circle fa-2x" />
                </button>
                {showMenu &&
                    <ul className="profile-dropdown">
                        <li>
                            <button className="new-listing NavButtons" onClick={() => setShowListingModal(true)}>New Listing</button>
                        </li>
                        <li>
                            <p className='title'>Your Listings</p>
                            {listings.length > 0 ? <ul className='listings'>
                                {listings.map(listing => (
                                    <NavLink className='listing' key={listing.id} to={`/surfboards/${listing.id}/`}>
                                        <p>{listing.location}</p>
                                        <p>{listing.size}'</p>
                                    </NavLink>
                                ))}
                            </ul> : <p className='no-listings-message'>You haven't posted any listings</p>}
                        </li>
                        <li>
                            <p className='title'>Renting</p>
                            {rentals.length > 0 ? <ul className='rentals'>
                                {rentals.map(rental => (
                                    <NavLink className='rental' key={rental.id} to={`/surfboards/${rental.surfboardId}/`}>
                                        <div className='rental-info'>
                                            <div className='board-info'>
                                                <div className='board-location'>{rental.location}</div>
                                                <div className='board-size'>{rental.size}'</div>
                                            </div>
                                            <div className='rental-date'>
                                                {`${rental.date.split(',')[0]}, ${rental.date.split(' ')[2]}
                                                ${rental.date.split(' ')[1]} ${rental.date.split(' ')[3]}`}
                                            </div>
                                        </div>
                                    </NavLink>
                                ))}
                            </ul> : <p className='no-listings-message'>You don't have any upcoming rentals booked</p>}
                        </li>
                        <li>
                            <button className="logout NavButtons" onClick={logout}>Log Out</button>
                        </li>
                    </ul>}
                {showListingModal && (
                    <Modal onClose={() => setShowListingModal(false)}>
                        <SurfboardForm callSetter={callSetter} />
                    </Modal>
                )}
            </>

        )
    } else {
        return (
            <>
                <button onClick={() => openMenu()} className='profile-button'>
                    <i className="fa fa-bars" />
                    <i className="fas fa-user-circle fa-2x" />
                </button>
                {showMenu && <ul className="profile-dropdown">
                    <li>
                        <button className='NavButtons signupNav-button' onClick={() => signupFunc()}>Sign Up</button>
                    </li>
                    <li>
                        <button className='NavButtons loginNav-button' onClick={() => loginFunc()}>Log In</button>
                    </li>
                    <li>
                        <button className='NavButtons demoUser-button' onClick={() => onDemo()}>Log In as Demo User</button>
                    </li>
                </ul>}
                {showSignupModal && (
                    <Modal onClose={() => setShowSignupModal(false)}>
                        <SignUpForm callSetter={closeSignupCallSetter} />
                    </Modal>
                )}
                {showLoginModal && (
                    <Modal onClose={() => setShowLoginModal(false)}>
                        <LoginForm callSetter={closeLoginCallSetter} />
                    </Modal>
                )}
            </>

        )
    }

}

export default ProfileButton;
