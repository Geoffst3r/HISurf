import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as listingsActions from '../../store/surfboard';
import './ListingsPage.css';

const Listings = () => {
    const dispatch = useDispatch();
    const listingsObj = useSelector(state => state.surfboards);
    let listings;
    if (listingsObj) listings = Object.values(listingsObj);

    useEffect(() => {
        dispatch(listingsActions.getListings());
    }, [dispatch]);

    const filter = async () => {
        const islandVal = document.getElementById('island-select').value;
        const sizeVal = document.getElementById('size-select').value;
        await dispatch(listingsActions.filterListings(islandVal, parseInt(sizeVal)));
        return;
    };

    if (listings.length) {
        return (
            <div className='surfboards-list-page'>
                <div className='filters'>
                    <div className='island-filter'>
                        <p>Island:</p>
                        <select id='island-select'>
                            <option value=''>All</option>
                            <option value='Oahu'>Oahu</option>
                            <option value='Maui'>Maui</option>
                            <option value='Big Island'>Big Island</option>
                            <option value='Kaui'>Kauai</option>
                            <option value='Molokai'>Molokai</option>
                            <option value='Lanai'>Lanai</option>
                        </select>
                    </div>
                    <div className='size-filter'>
                        <p>Size:</p>
                        <select id='size-select'>
                            <option value=''>All</option>
                            <option value='6'>6'</option>
                            <option value='7'>7'</option>
                            <option value='8'>8'</option>
                            <option value='9'>9'</option>
                            <option value='10'>10'</option>
                            <option value='11'>11'</option>
                        </select>
                    </div>
                    <button className='filter-set' onClick={() => filter()}>Filter</button>
                </div>
                <ul className='listings-list'>
                    {listings.map(listing => (
                        <li key={listing.id}>
                            <NavLink className='individual-item' to={`/surfboards/${listing.id}/`}>
                                {listing.image ? <div className='listing-img'><img alt='' src={`${listing.image}`} /></div>:
                                <div className='listing-img'>
                                    <i className='fas fa-camera fa-3x'></i>
                                    <p>No Image</p>
                                </div>}
                                <div className='listing-info'>
                                    <div className='locationANDsize'>
                                        <div className='listing-location'>{listing.location}</div>
                                        <div className='listing-size'>{listing.size}' Board</div>
                                    </div>
                                    <div className='listing-description'>{listing.description}</div>
                                </div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        )
    } else {
        return (
            <div className='surfboards-list-page'>
                <div className='filters'>
                    <div className='island-filter'>
                        <p>Island:</p>
                        <select id='island-select'>
                            <option value=''>All</option>
                            <option value='Oahu'>Oahu</option>
                            <option value='Maui'>Maui</option>
                            <option value='Big Island'>Big Island</option>
                            <option value='Kaui'>Kauai</option>
                            <option value='Molokai'>Molokai</option>
                            <option value='Lanai'>Lanai</option>
                        </select>
                    </div>
                    <div className='size-filter'>
                        <p>Size:</p>
                        <select id='size-select'>
                            <option value=''>All</option>
                            <option value='6'>6'</option>
                            <option value='7'>7'</option>
                            <option value='8'>8'</option>
                            <option value='9'>9'</option>
                            <option value='10'>10'</option>
                            <option value='11'>11'</option>
                        </select>
                    </div>
                    <button className='filter-set' onClick={() => filter()}>Filter</button>
                </div>
                <p className='no-listings'>No listings to display</p>
            </div>
        )
    }
}


export default Listings;
