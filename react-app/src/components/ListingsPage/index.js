import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Modal } from '../../context/Modal';
import SurfboardForm from '../SurfboardListings/SurfboardForm';
import * as listingsActions from '../../store/surfboard';
import * as rentalsActions from '../../store/rental';
import { authenticate } from '../../store/session';
import RentalForm from './RentalForm';
import './ListingPage.css';

const Listing = () => {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const [showEditListingModal, setShowEditListingModal] = useState(false);
    const [cogWheelClicked, setCogWheelClicked] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const listingObj = useSelector(state => state.surfboards);
    const rentalsObj = useSelector(state => state.rentals);
    let listing;
    if (listingObj) listing = listingObj[0];
    let userRentals;
    if (sessionUser && rentalsObj) {
        userRentals = Object.values(rentalsObj).filter(rental => rental.userId === sessionUser.id);
    };

    const surfboardId = params.surfboardId;
    let owner_define;
    if (sessionUser && listing) owner_define = (sessionUser.id === listing.ownerId);

    const callSetter = () => {
        setShowEditListingModal(false);
    };

    const callGetListing = () => {
        dispatch(listingsActions.getListing(surfboardId));
    };

    const onDelete = async (id) => {
        await dispatch(rentalsActions.deleteRental(id));
        dispatch(rentalsActions.getRentals(surfboardId));
        dispatch(authenticate());
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
        dispatch(rentalsActions.getRentals(surfboardId));
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
            <div className='listing-and-rental'>
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
                        {listing.image ? <div className='surfboard-img'><img alt='' src={`${listing.image}`} /></div> :
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
                <div className='rental-box'>
                    {owner_define ? Object.values(rentalsObj).length ? <ul className='upcoming-rentals'>
                        {Object.values(rentalsObj).map(rental =>
                            <li className='scheduled-rental'>
                                {`${rental.date.split(',')[0]}, ${rental.date.split(' ')[2]}
                                 ${rental.date.split(' ')[1]} ${rental.date.split(' ')[3]}`}
                            </li>
                        )}
                    </ul> : <p>No Listings to display</p> : <RentalForm getListing={callGetListing} />}
                    {userRentals && userRentals.length > 0 && <ul className='upcoming-user-rentals'>
                        {userRentals.map(rental =>
                            <li key={rental.id} className='scheduled-rental'>
                                <div className='individual-date'>
                                    {`${rental.date.split(',')[0]}, ${rental.date.split(' ')[2]}
                                    ${rental.date.split(' ')[1]} ${rental.date.split(' ')[3]}`}
                                </div>
                                <div className='rental-form-edit'><RentalForm getListing={callGetListing} rental={rental} /></div>
                                <button onClick={() => onDelete(rental.id)} className='delete-rental'>Delete Rental</button>
                            </li>
                        )}
                    </ul>}
                </div>
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
