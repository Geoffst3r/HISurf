// constants
const GET_LISTINGS = 'surfboards/GET_LISTINGS';
const GET_LISTING = 'surfboards/GET_LISTING';
const NEW_LISTING = 'surfboards/NEW_LISTING';

const get_Listings = (listings) => ({
  type: GET_LISTINGS,
  listings
});

const get_Listing = (listing) => ({
    type: GET_LISTING,
    listing
})

const new_Listing = (listing) => ({
  type: NEW_LISTING,
  listing
});

export const getListings = () => async (dispatch) => {
    const res = await fetch('/api/surfboards/');
    if (res.ok) {
        const listings = await res.json();
        dispatch(get_Listings(listings));
        return listings;
    };
};

export const getListing = (surfboardId) => async (dispatch) => {
    const res = await fetch(`/api/surfboards/`);
    if (res.ok) {
        const listings = await res.json();
        const listing = listings.filter(ind => ind.id === parseInt(surfboardId));
        dispatch(get_Listing(listing));
        return listing;
    };
}

export const filterListings = (island, size) => async (dispatch) => {
    const res = await fetch('/api/surfboards/');
    if (res.ok) {
        let listings = await res.json();
        if (island) listings = listings.filter(listing => listing.location === island)
        if (size) listings = listings.filter(listing => listing.size === size)
        dispatch(get_Listings(listings));
        return listings;
    };
}

export const newListing = (formData) => async (dispatch) => {
    const res = await fetch('/api/surfboards/', {
        method: 'POST',
        body: formData
    });
    if (res.ok) {
        const listing = await res.json();
        if (listing !== 'bad data') {
            dispatch(new_Listing(listing));
            return listing;
        }
    } else if (res.status < 500) {
        const errors = await res.json();
        return errors;
    } else {
        return ['An error occurred. Please try again.']
    }
};

export const updateListing = (formData, id) => async (dispatch) => {
    const res = await fetch(`/api/surfboards/${id}/`, {
        method: 'PUT',
        body: formData
    });
    if (res.ok) {
        const listing = await res.json();
        return listing;
    } else {
        return ['An error occurred. Please try again.']
    }
};

export const deleteListing = (surfboardId) => async (dispatch) => {
    const res = await fetch(`/api/surfboards/${surfboardId}/`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const msg = await res.json();
        if (msg === 'Success') return;
        return ['Could not delete.']
    } else {
        return ['An error occurred. Please try again.']
    }
};

const surfboardReducer = (state = {}, action) => {
    let newState = {};
    switch (action.type) {
        case GET_LISTINGS:
            action.listings.forEach(listing => {
                newState[listing.id] = listing;
            });
            return newState;
        case GET_LISTING:
            return action.listing;
        case NEW_LISTING:
            newState = Object.assign({}, state);
            newState[action.listing.id] = action.listing;
            return newState;
        default:
            return state;
    }
  };

  export default surfboardReducer;
