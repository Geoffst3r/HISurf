import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

function ProfileButton() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

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
                <button onClick={openMenu} className='profile-button'>
                    <i className="fas fa-user-circle fa-2x" />
                </button>
            </div>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>
                        <button className="logout-profile-button" onClick={log_out}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
