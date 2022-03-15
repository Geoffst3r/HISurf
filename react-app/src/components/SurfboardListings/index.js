import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Carousel from '../Carousel';
import * as listingsActions from '../../store/surfboard';
import './ListingsPage.css';

const Listings = () => {
    const dispatch = useDispatch();
    const listingsObj = useSelector(state => state.surfboards);
    const [loaded, setLoaded] = useState(false);
    const [mQuery, setMQuery] = useState(window.innerWidth);
    const [filtered, setFiltered] = useState(false);
    let listings;
    if (listingsObj) listings = Object.values(listingsObj);

    useEffect(() => {
        (async () => {
            await dispatch(listingsActions.getListings());
            setLoaded(true);
        })();
    }, [dispatch]);

    useEffect(() => {
        const checkWindow = () => {
            setMQuery(window.innerWidth);
        };
        window.addEventListener('resize', checkWindow);
        return () => window.removeEventListener('resize', checkWindow)
    }, []);

    const filter = async () => {
        setLoaded(false);
        const islandVal = document.getElementById('island-select').value;
        const sizeVal = document.getElementById('size-select').value;
        await dispatch(listingsActions.filterListings(islandVal, parseInt(sizeVal)));
        if (!islandVal && !sizeVal) setFiltered(false);
        else setFiltered(true);
        return setLoaded(true);
    };

    if (!loaded) {
        return (
            <div id='loading'>Loading Listings...</div>
        )
    }

    if (listings.length) {
        return (
            <div className='all-listings-page'>
                <div className='filters'>
                    <select id='island-select'>
                        <option value=''>-Island-</option>
                        <option value='Oahu'>Oahu</option>
                        <option value='Maui'>Maui</option>
                        <option value='Big Island'>Big Island</option>
                        <option value='Kaui'>Kauai</option>
                        <option value='Molokai'>Molokai</option>
                        <option value='Lanai'>Lanai</option>
                    </select>
                    <select id='size-select'>
                        <option value=''>-Size-</option>
                        <option value='6'>6'</option>
                        <option value='7'>7'</option>
                        <option value='8'>8'</option>
                        <option value='9'>9'</option>
                        <option value='10'>10'</option>
                        <option value='11'>11'</option>
                    </select>
                    <button className='filter-set' onClick={() => filter()}><i className='fa fa-search'></i></button>
                </div>
                <Carousel listings={listings} mQuery={mQuery} filtered={filtered} />
            </div>
        )
    } else {
        return (
            <div className='all-listings-page'>
                <div className='filters'>
                    <select id='island-select'>
                        <option value=''>-Island-</option>
                        <option value='Oahu'>Oahu</option>
                        <option value='Maui'>Maui</option>
                        <option value='Big Island'>Big Island</option>
                        <option value='Kaui'>Kauai</option>
                        <option value='Molokai'>Molokai</option>
                        <option value='Lanai'>Lanai</option>
                    </select>
                    <select id='size-select'>
                        <option value=''>-Size-</option>
                        <option value='6'>6'</option>
                        <option value='7'>7'</option>
                        <option value='8'>8'</option>
                        <option value='9'>9'</option>
                        <option value='10'>10'</option>
                        <option value='11'>11'</option>
                    </select>
                    <button className='filter-set' onClick={() => filter()}><i className='fa fa-search'></i></button>
                </div>
                <p className='no-listings'>No listings</p>
            </div>
        )
    }
};


export default Listings;
