import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './CarouselStyling.css';

const Carousel = ({ listings, mQuery, filtered }) => {
    const [index, setIndex] = useState(0);

    let carouselLength;
    let carouselListings = [];
    if (mQuery <= 1050 || filtered) {
        return (
            <div className='vertical-listings'>
                <ul className='vertical-list'>
                    {listings.map(listing => (
                        <li key={listing.id}>
                            <NavLink className='individual-item-vertical' to={`/surfboards/${listing.id}/`}>
                                <div className='listing-img-vertical'>
                                    {listing.image ? <img alt='' src={`${listing.image}`} /> :
                                        <img alt='' src='https://hi-surf-dev.s3.us-west-1.amazonaws.com/no-img.png' />}
                                </div>
                                <div className='listing-info-vertical'>
                                    <p className='info-title-vertical'>Island</p>
                                    <div className='listing-location-vertical'>{listing.location}</div>
                                    <p className='info-title-vertical'>Board Size</p>
                                    <div className='listing-size-vertical'>{listing.size}'</div>
                                    <p className='info-title-vertical'>Description</p>
                                    <div className='listing-description-vertical'>{listing.description}</div>
                                </div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        )
    } else {
        if (mQuery > 2250) carouselLength = 10;
        else if (mQuery > 2000) carouselLength = 9;
        else if (mQuery > 1700) carouselLength = 8;
        else if (mQuery > 1475) carouselLength = 7;
        else if (mQuery > 1250) carouselLength = 6;
        else carouselLength = 5;

        if (listings) {
            for (let i = index * carouselLength; i < (index + 1) * carouselLength; i++) {
                if (listings[i]) carouselListings.push(listings[i]);
            };
        }
    };

    const leftArrow = () => {
        setIndex(index - 1);
    };

    const rightArrow = () => {
        setIndex(index + 1);
    };

    const maxIndex = Math.ceil(listings.length / carouselLength - 1);

    return (
        <div className='carousel-container'>
            {index > 0 ? <button id='left' onClick={leftArrow}><i className='fas fa-arrow-left fa-2x' /></button> :
                <button id='disabled-arrow-button' disabled><i className='fas fa-arrow-left fa-2x' /></button>}
            <ul className='listings-list'>
                {carouselListings.map(listing => (
                    <li key={listing.id}>
                        <NavLink className='individual-item' to={`/surfboards/${listing.id}/`}>
                            <div className='listing-img'>
                                {listing.image ? <img alt='' src={`${listing.image}`} /> :
                                    <img alt='' src='https://hi-surf-dev.s3.us-west-1.amazonaws.com/no-img.png' />}
                            </div>
                            <div className='listing-location'>{listing.location}</div>
                            <div className='listing-size'>{listing.size}' Board</div>
                        </NavLink>
                    </li>
                ))}
            </ul>
            {index < maxIndex ? <button id='right' onClick={rightArrow}><i className='fas fa-arrow-right fa-2x' /></button> :
                <button id='disabled-arrow-button' disabled><i className='fas fa-arrow-right fa-2x' /></button>}
        </div>
    )
};

export default Carousel;
