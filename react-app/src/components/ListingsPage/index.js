import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Modal } from '../../context/Modal';
import SurfboardForm from '../SurfboardListings/SurfboardForm';
import * as listingsActions from '../../store/surfboard';
import { authenticate } from '../../store/session';
import './ListingPage.css';

const Listing = () => {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const [showEditListingModal, setShowEditListingModal] = useState(false);
    const [cogWheelClicked, setCogWheelClicked] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const listingObj = useSelector(state => state.surfboards);
    let listing;
    if (listingObj) listing = listingObj[0];

    const surfboardId = params.surfboardId;
    let owner_define;
    if (sessionUser && listing) owner_define = (sessionUser.id === listing.ownerId);

    const callSetter = () => {
        setShowEditListingModal(false);
    };

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to remove this listing? This action cannot be undone.')
        if (confirmed) {
            await dispatch(listingsActions.deleteListing(surfboardId));
            dispatch(listingsActions.getListings());
            dispatch(authenticate());
            history.push(`/surfboards/`);
        };
    }

    useEffect(() => {
        dispatch(listingsActions.getListing(surfboardId));
    }, [dispatch, surfboardId]);

    useEffect(() => {
        if (!cogWheelClicked) return;

        const closeMenu = (e) => {
            const editButton = document.querySelector('.edit-listing');
            const deleteButton = document.querySelector('.delete-listing');

            if (editButton && deleteButton && e.target !== deleteButton && e.target !== editButton) {
                setCogWheelClicked(false);
            }
            return
        };

        document.addEventListener('click', closeMenu, false);

        return () => document.removeEventListener("click", closeMenu);
    })

    if (listing) {
        return (
            <div className='surfboard-listing'>
                {owner_define && <div className='modifications'>
                    <button className='mod-channel-button' id={`cog-wheel`}
                    onClick={() => setCogWheelClicked(true)} hidden={owner_define === true ? false : true}>
                    <i className='fas fa-cog' id={`cog-icon`}></i></button>
                    {cogWheelClicked && <div className='edit-delete'>
                        <button className='edit-listing' onClick={() => setShowEditListingModal(true)}>
                            Edit Listing
                        </button>
                        <button className='delete-listing' onClick={() => handleDelete()}>
                            Delete Listing
                        </button>
                    </div>}
                    {showEditListingModal && (
                        <Modal onClose={() => setShowEditListingModal(false)}>
                            <SurfboardForm inputBoard={listing} callSetter={callSetter} />
                        </Modal>
                    )}
                </div>}
                <div className='imgANDinfo'>
                    {listing.image ? <img alt='' src={`${listing.image}`}></img> :
                    <div className='surfboard-img'>
                        <i className='fas fa-camera fa-3x'></i>
                        <p>No Image</p>
                    </div>}
                    <div className='surfboard-info'>
                        <div className='surfboard-location'>{listing.location}</div>
                        <div className='surfboard-size'>{listing.size}' Board</div>
                    </div>
                </div>
                <div className='surfboard-description'>{listing.description}</div>
            </div>
        )
    } else {
        return (
            <>
            </>
        )
    }
}


export default Listing;
