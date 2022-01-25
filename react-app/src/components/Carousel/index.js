import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './CarouselStyling.css';

const Carousel = ({ listingsObj }) => {
    const [index, setIndex] = useState(0);
    let listings, maxIndex;
    let carouselListings = [];
    if (listingsObj) {
        listings = Object.values(listingsObj);
        maxIndex = Math.ceil(listings.length/5 - 1);
    };

    const getCarouselListings = () => {
        if (listings) {
            for (let i = index*5; i < (index+1)*5; i++) {
                if (listings[i]) carouselListings.push(listings[i]);
            };
        };
    };

    const leftArrow = () => {
        setIndex(index - 1);
    };

    const rightArrow = () => {
        setIndex(index + 1);
    };

    getCarouselListings(index);

    if (carouselListings) {
        return (
            <div className='carousel-container'>
                {index > 0 && <button onClick={leftArrow}><i className='fas fa-arrow-left fa-2x'/></button>}
                <ul className='listings-list'>
                    {carouselListings.map(listing => (
                        <li key={listing.id}>
                            <NavLink className='individual-item' to={`/surfboards/${listing.id}/`}>
                                {listing.image ? <div className='listing-img'><img alt='' src={`${listing.image}`} /></div>:
                                <div className='listing-img'>
                                    <i className='fas fa-camera fa-3x'></i>
                                    <p>No Image</p>
                                </div>}
                                <div className='listing-location'>{listing.location}</div>
                                <div className='listing-size'>{listing.size}' Board</div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
                {index < maxIndex && <button onClick={rightArrow}><i className='fas fa-arrow-right fa-2x'/></button>}
            </div>
        )
    } else {
        return (
            <>
            </>
        )
    }
};

export default Carousel;
