// constants
const GET_RENTALS = 'surfboards/GET_RENTALS';
const NEW_RENTAL = 'surfboards/NEW_RENTAL';
const UPDATE_RENTAL = 'surfboards/UPDATE_RENTAL';
const DELETE_RENTAL = 'surfboards/DELETE_RENTAL';

const get_Rentals = (rentals) => ({
  type: GET_RENTALS,
  rentals
});

const new_Rental = (rental) => ({
  type: NEW_RENTAL,
  rental
});

const update_Rental = (rental) => ({
  type: UPDATE_RENTAL,
  rental
});

const delete_Rental = (id) => ({
  type: DELETE_RENTAL,
  id
});

export const getRentals = (surfboardId) => async (dispatch) => {
    const res = await fetch(`/api/rentals/${surfboardId}/`);
    if (res.ok) {
        const rentals = await res.json();
        dispatch(get_Rentals(rentals));
        return rentals;
    };
};

export const newRental = (formData, surfboardId) => async (dispatch) => {
    const res = await fetch(`/api/rentals/${surfboardId}/`, {
        method: 'POST',
        body: formData
    });
    if (res.ok) {
        const rental = await res.json();
        if (rental !== 'bad data') {
            dispatch(new_Rental(rental));
        }
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
};

export const updateRental = (formData, rentalId) => async (dispatch) => {
    const res = await fetch(`/api/rentals/${rentalId}/`, {
        method: 'PUT',
        body: formData
    });
    if (res.ok) {
        const rental = await res.json();
        dispatch(update_Rental(rental));
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
};

export const deleteRental = (rentalId) => async (dispatch) => {
    const res = await fetch(`/api/rentals/${rentalId}/`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const msg = await res.json();
        if (msg === 'Success') dispatch(delete_Rental(rentalId));
        return ['Could not delete.']
    } else {
        return ['An error occurred. Please try again.']
    }
};

const rentalReducer = (state = {}, action) => {
    let newState = {};
    switch (action.type) {
        case GET_RENTALS:
            if (action.rentals === 'Rentals not found') return newState;
            action.rentals.forEach(rental => {
                newState[rental.id] = rental;
            });
            return newState;
        case NEW_RENTAL || UPDATE_RENTAL:
            newState = Object.assign({}, state);
            newState[action.rental.id] = action.rental;
            return newState;
        case DELETE_RENTAL:
            newState = Object.assign({}, state);
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
  };

  export default rentalReducer;
