import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Carousel from '../Carousel';
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
            <div className='all-listings-page'>
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
                <Carousel listingsObj={listingsObj} />
            </div>
        )
    } else {
        return (
            <div className='all-listings-page'>
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
};


export default Listings;
