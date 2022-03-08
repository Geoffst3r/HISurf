import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getReviews, newReview, updateReview } from '../../store/review';
import './ReviewForm.css';

const ReviewForm = ({ surfboardId, sessionUser, review }) => {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(review ? review.rating : 0);
    const [description, setDescription] = useState(review ? review.description : '');
    const [errors, setErrors] = useState([]);
    const descriptionLabelText = review ? 'Update Description' : 'Description';

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        if (!rating || !description) {
            let errors = [];
            if (!rating) errors.push('no rating : Please give a rating.');
            if (!description) errors.push('no description : Please provide a description.')
            return setErrors(errors)
        }

        if (sessionUser) {
            const formData = new FormData();
            formData.append('rating', rating);
            formData.append('description', description);
            formData.append('surfboardId', surfboardId);
            formData.append('userId', sessionUser.id);
            const data = await dispatch(newReview(formData, surfboardId));
            if (data) {
                return setErrors(data);
            } else {
                await dispatch(getReviews(surfboardId));
                setDescription('');
                return setRating(0);
            };
        };
    };

    const onEdit = async (e) => {
        e.preventDefault();
        setErrors([]);

        if (!rating || !description) {
            let errors = [];
            if (!rating) errors.push('no rating : Please give a rating.');
            if (!description) errors.push('no description : Please provide a description.')
            return setErrors(errors)
        }

        if (sessionUser) {
            const formData = new FormData();
            formData.append('rating', rating);
            formData.append('description', description);
            formData.append('surfboardId', surfboardId);
            formData.append('userId', sessionUser.id);
            const data = await dispatch(updateReview(formData, surfboardId));
            if (data) {
                return setErrors(data);
            } else {
                await dispatch(getReviews(surfboardId));
                setDescription('');
                return setRating(0);
            };
        };
    };

    const updateRating = (e) => {
        setRating(e.target.value);
    };

    const updateDescription = (e) => {
        setDescription(e.target.value);
    };

    let errorMSGs = [];
    if (errors.length) errors.forEach(error => errorMSGs.push(error.split(' : ')[1]));

    useEffect(() => {
        setErrors([])
    }, [dispatch, surfboardId])

    return (
        <>
            <form onSubmit={review ? onEdit : onSubmit} className='review-form'>
                {errorMSGs.length > 0 && <div className='review-error-box'>
                    {errorMSGs.map((error, ind) => (
                        <div key={ind} className='review-error'><i className='fas fa-times-circle' /> {error}</div>
                    ))}
                </div>}
                <input
                    type='range'
                    max="5"
                    name='review-rating'
                    value={rating}
                    onChange={updateRating}
                />
                <label className={review ? 'edit-description-label' : 'description-label'} htmlFor='review-description'>{descriptionLabelText}</label>
                <textarea
                    name='review-description'
                    value={description}
                    onChange={updateDescription}
                />
                {review ? <button className={`review-button-${review.id} edit-review-button`} type='submit'>Update Review</button> :
                    <button className='rental-button' type='submit'>Submit Review</button>}
            </form>
        </>
    );
};

export default ReviewForm;
