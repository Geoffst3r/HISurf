import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRentals, newRental, updateRental } from '../../store/rental';
import { authenticate } from '../../store/session';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginModal/LoginForm';

const RentalForm = ({ getListing, rental }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const text = rental ? 'Edit Date' : 'Request Rental';

  const surfboardId = params?.surfboardId;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (date && sessionUser) {
      const formData = new FormData();
      formData.append('date', date);
      formData.append('surfboardId', surfboardId);
      formData.append('userId', sessionUser.id);
      await dispatch(newRental(formData, surfboardId));
      await dispatch(authenticate());
      await dispatch(getRentals(surfboardId));
    } else {
      return setError(['Please select a date for rental.']);
    }
  };

  const onEdit = async (e) => {
    e.preventDefault();
    setError('');

    if (date) {
      const formData = new FormData();
      formData.append('date', date);
      await dispatch(updateRental(formData, rental.id));
      await dispatch(authenticate())
      await dispatch(getRentals(surfboardId));
    } else {
      return setError(['Please select a date for rental.']);
    }
  };

  const callSetter = () => {
    setShowModal(false);
  }

  const updateDate = (e) => {
    setDate(e.target.value);
  };

  return (
    <>
      <form onSubmit={rental ? onEdit : onSubmit} className='rental-form'>
        {error && <div className='error-box'>
          <p className='error'>{error}</p>
        </div>}
        <input
          type='date'
          name='rental-date'
          value={date}
          onChange={updateDate}
          min='2022-01-01'
          max='2022-12-31'
        />
        {sessionUser ? <button className='rental-button' type='submit'>{text}</button> :
        <button className='login-button-required' type='button' onClick={() => setShowModal(true)}>Log in to Rent</button>}
      </form>
      {showModal && <Modal onClose={() => setShowModal(false)}>
          <LoginForm callSetter={callSetter}/>
      </Modal>}
    </>
  );
};

export default RentalForm;
