import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Modal } from '../../context/Modal';
import SurfboardForm from '../SurfboardListings/SurfboardForm';
import * as listingsActions from '../../store/surfboard';
import * as rentalsActions from '../../store/rental';
import * as reviewActions from '../../store/review';
import { authenticate } from '../../store/session';
import RentalForm from './RentalForm';
import ReviewForm from './ReviewForm';
import './ListingPage.css';

const Listing = () => {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const [showEditListingModal, setShowEditListingModal] = useState(false);
    const [cogWheelClicked, setCogWheelClicked] = useState(false);
    const [individualCogWheelClicked, setIndividualCogWheelClicked] = useState(false);
    const [individualRentalId, setIndividualRentalId] = useState(0);
    const sessionUser = useSelector(state => state.session.user);
    const listingObj = useSelector(state => state.surfboards);
    const rentalsObj = useSelector(state => state.rentals);
    let listing;
    if (listingObj) listing = listingObj[0];
    let userRentals;
    if (sessionUser && rentalsObj) {
        let rentalsArr = Object.values(rentalsObj).filter(rental => rental.userId === sessionUser.id);
        userRentals = rentalsArr.sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    const surfboardId = params.surfboardId;
    let owner_define;
    if (sessionUser && listing) owner_define = (sessionUser.id === listing.ownerId);

    const callSetter = () => {
        setShowEditListingModal(false);
    };

    const onDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to remove this request? This action cannot be undone.');
        if (confirmed) {
            await dispatch(rentalsActions.deleteRental(individualRentalId));
            dispatch(rentalsActions.getRentals(surfboardId));
            dispatch(authenticate());
        };
    };

    const closeModMenu = () => {
        const editRental = document.getElementById(`rental-edit-${individualRentalId}`);
        const deleteRental = document.getElementById(`rental-delete-${individualRentalId}`);
        const cogWheel = document.getElementById(`cog-wheel-${individualRentalId}`);
        editRental.className = 'edit-rental';
        deleteRental.className = 'delete-rental';
        cogWheel.className = 'mod-rental-button';
        setIndividualCogWheelClicked(false);
        return setIndividualRentalId();
    }

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to remove this listing? This action cannot be undone.');
        if (confirmed) {
            await dispatch(listingsActions.deleteListing(surfboardId));
            dispatch(listingsActions.getListings());
            dispatch(authenticate());
            history.push(`/surfboards/`);
        };
    };

    const modRental = (id) => {
        setIndividualRentalId(id);
        const editRental = document.getElementById(`rental-edit-${id}`);
        const deleteRental = document.getElementById(`rental-delete-${id}`);
        const cogWheel = document.getElementById(`cog-wheel-${id}`);

        if (cogWheel.className === 'mod-rental-button-persist') {
            editRental.className = 'edit-rental';
            deleteRental.className = 'delete-rental';
            cogWheel.className = 'mod-rental-button';
            setIndividualCogWheelClicked(false);
        } else {
            editRental.className = 'edit-rental-visible';
            deleteRental.className = 'delete-rental-visible';
            cogWheel.className = 'mod-rental-button-persist';
            setIndividualCogWheelClicked(true);
        };
    };

    useEffect(() => {
        if (!individualCogWheelClicked && !individualRentalId) return;

        const closeMenu = (e) => {
            const editRental = document.getElementById(`rental-edit-${individualRentalId}`);
            const editDateInput = document.querySelector(`.date-input-${individualRentalId}`);
            const rentalButton = document.querySelector(`.rental-button-${individualRentalId}`);
            const deleteRental = document.getElementById(`rental-delete-${individualRentalId}`);
            const cogWheelButton = document.getElementById(`cog-wheel-${individualRentalId}`);
            const cogWheel = document.getElementById(`cog-icon-${individualRentalId}`);

            if (editDateInput && rentalButton && deleteRental && cogWheelButton &&
                e.target !== editDateInput && e.target !== rentalButton &&
                e.target !== deleteRental && e.target !== cogWheelButton && e.target !== cogWheel) {
                editRental.className = 'edit-rental';
                deleteRental.className = 'delete-rental';
                cogWheelButton.className = 'mod-rental-button';
                setIndividualCogWheelClicked(false);
            }
            return
        };

        document.addEventListener('click', closeMenu, false);

        return () => document.removeEventListener("click", closeMenu);
    }, [individualRentalId, individualCogWheelClicked]);

    useEffect(() => {
        dispatch(listingsActions.getListing(surfboardId));
        dispatch(rentalsActions.getRentals(surfboardId));
        dispatch(reviewActions.getReviews(surfboardId));
    }, [dispatch, surfboardId]);

    useEffect(() => {
        if (!cogWheelClicked) return;

        const closeMenu = (e) => {
            return setCogWheelClicked(false);
        };

        document.addEventListener('click', closeMenu, false);

        return () => document.removeEventListener("click", closeMenu);
    })

    if (listing) {
        return (
            <div className='listing-and-rental'>
                <div className='surfboard-listing'>
                    {owner_define && <div className='modifications'>
                        <button className='mod-listing-button'
                            onClick={() => setCogWheelClicked(true)} hidden={owner_define === true ? false : true}>
                            <i className='fas fa-edit'></i></button>
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
                    <div className='surfboard-info'>
                        <div className='surfboard-location'>{listing.location}</div>
                        <div className='surfboard-size'>{listing.size}' Board</div>
                    </div>
                    <div className='surfboard-img'>
                        {listing.image ? <img alt='' src={`${listing.image}`} /> :
                            <div className='no-image-container'>
                                <i className='fas fa-camera fa-5x'></i>
                                <p>No Image</p>
                            </div>}
                    </div>
                </div>
                <div className='rental-box'>
                    <div className='surfboard-description'>{listing.description}</div>
                    {owner_define && <p className='rentals-header'>Upcoming Rentals</p>}
                    {owner_define ? Object.values(rentalsObj).length ? <ul className='upcoming-rentals'>
                        {Object.values(rentalsObj).sort((a, b) => new Date(a.date) - new Date(b.date))
                            .map(rental =>
                                <li key={rental.date} className='scheduled-rental'>
                                    {`${rental.date.split(',')[0]}, ${rental.date.split(' ')[2]}
                                    ${rental.date.split(' ')[1]} ${rental.date.split(' ')[3]}`}
                                </li>
                            )}
                    </ul> : <p>No Upcoming Rentals</p> : <RentalForm />}
                    {userRentals && userRentals.length > 0 && <ul className='upcoming-user-rentals'>
                        {userRentals.map(rental =>
                            <li key={rental.id} className='scheduled-rental'>
                                <div className='individual-date'>
                                    <div className='date'>
                                        {`${rental.date.split(',')[0]}, ${rental.date.split(' ')[2]}
                                        ${rental.date.split(' ')[1]} ${rental.date.split(' ')[3]}`}
                                    </div>
                                    <button className='mod-rental-button' id={`cog-wheel-${rental.id}`}
                                        onClick={() => modRental(rental.id)}><i id={`cog-icon-${rental.id}`} className='fas fa-edit' /></button>
                                </div>
                                <div className='mods'>
                                    <div className='edit-rental' id={`rental-edit-${rental.id}`}><RentalForm rental={rental} callMenuClose={closeModMenu} /></div>
                                    <button id={`rental-delete-${rental.id}`} onClick={() => onDelete()} className='delete-rental'>Cancel Reservation</button>
                                </div>
                            </li>
                        )}
                    </ul>}
                </div>
                <div className='review-box'>
                    {sessionUser ? <ReviewForm surfboardId={surfboardId} sessionUser={sessionUser} /> :
                        'Log in to submit a Review of this surfboard'}
                </div>
            </div>
        )
    } else {
        return (
            <h1 className='no-listing-message'>Listing Does Not Exist</h1>
        )
    }
}


export default Listing;
