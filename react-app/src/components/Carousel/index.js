import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './CarouselStyling.css';

const Carousel = ({ listingsObj }) => {
    const [index, setIndex] = useState(0);
    const [mQuery, setMQuery] = useState(window.innerWidth);
    let listings, maxIndex;
    let carouselListings = [];
    let carouselLength;
    if (mQuery > 1750) carouselLength = 11;
    else if (mQuery > 1500) carouselLength = 8;
    else if (mQuery > 1250) carouselLength = 7;
    else if (mQuery > 1000) carouselLength = 5;
    else if (mQuery > 750) carouselLength = 3;
    else if (mQuery > 600) carouselLength = 2;
    else carouselLength = 1;

    if (listingsObj) {
        listings = Object.values(listingsObj);
        maxIndex = Math.ceil(listings.length/carouselLength - 1);
    };

    const getCarouselListings = () => {
        if (listings) {
            for (let i = index*carouselLength; i < (index+1)*carouselLength; i++) {
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

    getCarouselListings(index);

    if (carouselListings) {
        return (
            <div className='carousel-container'>
                {index > 0 && <button onClick={leftArrow}><i className='fas fa-arrow-left fa-2x'/></button>}
                <ul className='listings-list'>
                    {carouselListings.map(listing => (
                        <li key={listing.id}>
                            <NavLink className='individual-item' to={`/surfboards/${listing.id}/`}>
                                <div className='listing-img'>
                                    {listing.image ? <img alt='' src={`${listing.image}`} />:
                                    <img alt='' src='https://hi-surf-dev.s3.us-west-1.amazonaws.com/no-image.jpg' />}
                                </div>
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
