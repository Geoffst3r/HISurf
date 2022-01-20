import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as listingsActions from '../../store/surfboard';
import './ListingPage.css';

const Listing = () => {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const [showEditListingModal, setShowEditListingModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const listingObj = useSelector(state => state.surfboards);
    let listing;
    if (listingObj) listing = listingObj[0];

    const surfboardId = params.surfboardId;
    let owner_define;
    if (sessionUser && surfboardId) owner_define = (sessionUser.id === surfboardId);

    useEffect(() => {
        dispatch(listingsActions.getListing(surfboardId));
    }, [dispatch, surfboardId]);

    if (listing) {
        return (
            <div className='surfboard-listing'>
                {/* {owner_define &&
                <ul className='mod-listing' id={`listing-mod-${listing.id}`}>
                    <li>
                        <button className='edit-listing-button' onClick={() => setShowEditListingModal(true)}>Edit Listing</button>
                        {showEditListingModal && (
                            <Modal onClose={() => setShowEditChannelModal(false)}>
                                <ChannelForm callSetter={callEditSetter} inputChannel={individualChannel} />
                            </Modal>
                        )}
                    </li>
                    <li>
                        <button className='delete-channel-button' onClick={() => handleDelete()}>Delete Channel</button>
                    </li>
                </ul>} */}
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
