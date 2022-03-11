import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import './SideBar.css';

const SideBar = () => {
    const user = useSelector(state => state.session.user);
    const listingsObj = user?.listings;
    const rentalsObj = user?.rentals;
    let listings;
    let rentals;
    if (listingsObj) listings = Object.values(listingsObj);
    if (rentalsObj) {
        let rentalsArr = Object.values(rentalsObj);
        rentals = rentalsArr.sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    if (user) {
        return (
            <div className='sidebar'>
                <div className='listings-container'>
                    <p className='listings-title'>Listings</p>
                    {listings.length > 0 ? <ul className='listings'>
                        {listings.map(listing => (
                            <NavLink className='listing' key={listing.id} to={`/surfboards/${listing.id}/`}>
                                <p>{listing.location}</p>
                                <p>{listing.size}'</p>
                            </NavLink>
                        ))}
                    </ul> : <p className='no-listings-message'>You haven't posted any listings</p>}
                </div>
                <div className='rentals-container'>
                    <p className='rentals-title'>Rentals</p>
                    {rentals.length > 0 ? <ul className='rentals'>
                        {rentals.map(rental => (
                            <NavLink className='rental' key={rental.id} to={`/surfboards/${rental.surfboardId}/`}>
                                <div className='rental-info'>
                                    <div className='board-info'>
                                        <div className='board-location'>{rental.location}</div>
                                        <div className='board-size'>{rental.size}'</div>
                                    </div>
                                    <div className='rental-date'>
                                        {`${rental.date.split(',')[0]}, ${rental.date.split(' ')[2]}
                                        ${rental.date.split(' ')[1]} ${rental.date.split(' ')[3]}`}
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </ul> : <p className='no-listings-message'>You don't have any upcoming rentals booked</p>}
                </div>
            </div>
        )
    } else {
        return (
            <div className='sidebar'>
                <div className='listings-container'>
                    <p className='listings-title'>Listings</p>
                    <p className='no-user-message'>Log in to view your listings</p>
                </div>
                <div className='split'></div>
                <div className='rentals-container'>
                    <p className='rentals-title'>Rentals</p>
                    <p className='no-user-message'>Log in to view your rentals</p>
                </div>
            </div>
        )
    }
}

export default SideBar;
