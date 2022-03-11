// constants
const GET_REVIEWS = 'surfboards/GET_REVIEWS';
const NEW_REVIEW = 'surfboards/NEW_REVIEW';
const UPDATE_REVIEW = 'surfboards/UPDATE_REVIEW';
const DELETE_REVIEW = 'surfboards/DELETE_REVIEW';

const get_Reviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
});

const new_Review = (review) => ({
    type: NEW_REVIEW,
    review
});

const update_Review = (review) => ({
    type: UPDATE_REVIEW,
    review
});

const delete_Review = (id) => ({
    type: DELETE_REVIEW,
    id
});

export const getReviews = (surfboardId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${surfboardId}/`);
    if (res.ok) {
        const reviews = await res.json();
        dispatch(get_Reviews(reviews));
    };
};

export const newReview = (formData, surfboardId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${surfboardId}/`, {
        method: 'POST',
        body: formData
    });
    if (res.ok) {
        const review = await res.json();
        if (review !== 'bad data') {
            dispatch(new_Review(review));
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

export const updateReview = (formData, reviewId) => async (dispatch) => {
    const res = await fetch(`/api/rentals/${reviewId}/`, {
        method: 'PUT',
        body: formData
    });
    if (res.ok) {
        const review = await res.json();
        dispatch(update_Review(review));
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
};

export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}/`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const msg = await res.json();
        if (msg === 'Success') dispatch(delete_Review(reviewId));
        return ['Could not delete.']
    } else {
        return ['An error occurred. Please try again.']
    }
};

const reviewReducer = (state = {}, action) => {
    let newState = {};
    switch (action.type) {
        case GET_REVIEWS:
            if (action.reviews === 'No Reviews Found') return newState;
            action.reviews.forEach(review => {
                newState[review.id] = review;
            });
            return newState;
        case NEW_REVIEW || UPDATE_REVIEW:
            newState = Object.assign({}, state);
            newState[action.review.id] = action.review;
            return newState;
        case DELETE_REVIEW:
            newState = Object.assign({}, state);
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
};

export default reviewReducer;
