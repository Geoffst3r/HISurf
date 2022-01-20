import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import SurfboardForm from "../SurfboardListings/SurfboardForm";
import { logout } from '../../store/session';

function ProfileButton() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [showListingModal, setShowListingModal] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const callSetter = () => {
        setShowListingModal(false);
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const log_out = async () => {
        await dispatch(logout());
    };

    return (
        <>
            <div className="user-stuff">
                <button onClick={openMenu} className='NavButtons'>
                    <i className="fas fa-user-circle fa-2x" />
                </button>
            </div>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>
                        <button className="add-listing" onClick={() => setShowListingModal(true)}>New Listing</button>
                    </li>
                    <li>
                        <button className="logout-profile-button" onClick={log_out}>Log Out</button>
                    </li>
                </ul>
            )}
            {showListingModal && (
                <Modal onClose={() => setShowListingModal(false)}>
                    <SurfboardForm callSetter={callSetter} />
                </Modal>
            )}
        </>
    );
}

export default ProfileButton;
