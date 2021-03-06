import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRentals, newRental, updateRental } from '../../store/rental';
import { authenticate } from '../../store/session';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginModal/LoginForm';
import './form.css'

const RentalForm = ({ rental, callMenuClose }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  const surfboardId = params?.surfboardId;
  const inputLabelText = rental ? 'Modify Reservation Date?' : 'What day would you like to rent this board?';

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!date) {
      return setErrors(['no date : Please input a date.']);
    }

    if (date && sessionUser) {
      const formData = new FormData();
      formData.append('date', date);
      formData.append('surfboardId', surfboardId);
      formData.append('userId', sessionUser.id);
      const data = await dispatch(newRental(formData, surfboardId));
      if (data) {
        return setErrors(data);
      } else {
        await dispatch(authenticate());
        await dispatch(getRentals(surfboardId));
        return setDate('');
      };
    };
  };

  const onEdit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!date) {
      return setErrors(['no date : Please input a date.']);
    }

    if (date && sessionUser) {
      const formData = new FormData();
      formData.append('date', date);
      formData.append('surfboardId', surfboardId);
      formData.append('userId', sessionUser.id);
      const data = await dispatch(updateRental(formData, rental.id));
      if (data) {
        return setErrors(data);
      } else {
        callMenuClose();
        await dispatch(authenticate());
        await dispatch(getRentals(surfboardId));
        return setDate('');
      };
    }
  };

  const updateDate = (e) => {
    setDate(e.target.value);
  };

  let errorMSGs = [];
  if (errors.length) errors.forEach(error => errorMSGs.push(error.split(' : ')[1]));

  useEffect(() => {
    setErrors([])
  }, [dispatch, surfboardId])

  return (
    <>
      <form onSubmit={rental ? onEdit : onSubmit} className='rental-form'>
        <label className={rental ? 'edit-rental-label' : 'rental-label'} htmlFor='rental-date'>{inputLabelText}</label>
        <input
          className={rental ? `date-input-${rental.id} date-input` : 'date-post'}
          type='date'
          name='rental-date'
          value={date}
          onChange={updateDate}
          min='2022-01-01'
          max='2022-12-31'
        />
        {sessionUser ? rental ? <button className={`rental-button-${rental.id} edit-rental-button`} type='submit'>Confirm Reservation Change</button> :
          <button className='rental-button' type='submit'>Reserve</button> :
          <button className='rental-button login-button-required' type='button' onClick={() => setShowLoginModal(true)}>Log in to Rent</button>}
        {errorMSGs.length > 0 && <div className='rental-error-box'>
          {errorMSGs.map((error, ind) => (
            <div key={ind} className='rental-error'><i className='fas fa-times-circle' /> {error}</div>
          ))}
        </div>}
      </form>
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm callSetter={() => setShowLoginModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default RentalForm;
