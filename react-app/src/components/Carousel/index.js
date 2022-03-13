import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './CarouselStyling.css';

const Carousel = ({ listings }) => {
    const [index, setIndex] = useState(0);
    const [mQuery, setMQuery] = useState(window.innerWidth);
    const [verticalListing, setVerticalListing] = useState(false);
    let carouselListings = [];
    let carouselLength;
    if (mQuery > 2250) carouselLength = 9;
    else if (mQuery > 2000) carouselLength = 8;
    else if (mQuery > 1700) carouselLength = 7;
    else if (mQuery > 1450) carouselLength = 6;
    else if (mQuery > 1250) carouselLength = 5;
    else if (mQuery > 1050) carouselLength = 4;
    else {
        carouselLength = 0;
        setVerticalListing(true);
    }
    // else if (mQuery > 800) carouselLength = 3;
    // else if (mQuery > 600) carouselLength = 2;
    // else carouselLength = 1;

    let maxIndex;
    if (listings && !verticalListing) {
        maxIndex = Math.ceil(listings.length / carouselLength - 1);
    };

    const getCarouselListings = () => {
        if (listings) {
            for (let i = index * carouselLength; i < (index + 1) * carouselLength; i++) {
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

    useEffect(() => {
        const checkWindow = () => {
            setMQuery(window.innerWidth);
        };
        window.addEventListener('resize', checkWindow);
        return () => window.removeEventListener('resize', checkWindow)
    }, []);

    if (!verticalListing) getCarouselListings(index);

    if (verticalListing && listings.length) {
        return (
            <div className='vertical-listings'>
                <ul className='vertical-list'>
                    {listings.map(listing => (
                        <li key={listing.id}>
                            <NavLink className='individual-listing' to={`/surfboards/${listing.id}/`}>
                                <div className='listing-img-vertical'>
                                    {listing.image ? <img alt='' src={`${listing.image}`} /> :
                                        <img alt='' src='https://hi-surf-dev.s3.us-west-1.amazonaws.com/no-image.jpg' />}
                                </div>
                                <div className='listing-location-vertical'>{listing.location}</div>
                                <div className='listing-size-vertical'>{listing.size}' Board</div>
                                <div className='listing-description-vertical'>{listing.description}</div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        )
    } else if (!verticalListing && listings.length) {
        return (
            <div className='carousel-container'>
                {index > 0 && <button onClick={leftArrow}><i className='fas fa-arrow-left fa-2x' /></button>}
                <ul className='listings-list'>
                    {carouselListings.map(listing => (
                        <li key={listing.id}>
                            <NavLink className='individual-item' to={`/surfboards/${listing.id}/`}>
                                <div className='listing-img'>
                                    {listing.image ? <img alt='' src={`${listing.image}`} /> :
                                        <img alt='' src='https://hi-surf-dev.s3.us-west-1.amazonaws.com/no-image.jpg' />}
                                </div>
                                <div className='listing-location'>{listing.location}</div>
                                <div className='listing-size'>{listing.size}' Board</div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
                {index < maxIndex && <button onClick={rightArrow}><i className='fas fa-arrow-right fa-2x' /></button>}
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
