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
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector(state => state.session.user);

  const surfboardId = params?.surfboardId;

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (date && sessionUser) {
      const formData = new FormData();
      formData.append('date', date);
      formData.append('surfboardId', surfboardId);
      formData.append('userId', sessionUser.id);
      const data = await dispatch(newRental(formData, surfboardId));
      console.log(data);
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

    if (date && sessionUser) {
      const formData = new FormData();
      formData.append('date', date);
      formData.append('surfboardId', surfboardId);
      formData.append('userId', sessionUser.id);
      const data = await dispatch(updateRental(formData, rental.id));
      if (data) {
        return setErrors(data);
      } else {
        await dispatch(authenticate());
        await dispatch(getRentals(surfboardId));
        return setDate('');
      };
    }
  };

  const callSetter = () => {
    setShowModal(false);
  }

  const updateDate = (e) => {
    setDate(e.target.value);
  };

  let errorMSGs = [];
  if (errors.length) errors.forEach(error => errorMSGs.push(error.split(' : ')[1]));

  return (
    <>
      <form onSubmit={rental ? onEdit : onSubmit} className='rental-form'>
        {errors && <div className='error-box'>
          {errorMSGs.map((error, ind) => (
            <div key={ind} className='error'>--{error}</div>
          ))}
        </div>}
        <input
          className={rental ? `date-input-${rental.id}` : 'date-post'}
          type='date'
          name='rental-date'
          value={date}
          onChange={updateDate}
          min='2022-01-01'
          max='2022-12-31'
        />
        {sessionUser ? rental ? <button className={`rental-button-${rental.id}`} type='submit'>Edit Date</button> :
        <button className='rental-button' type='submit'>Request Rental</button> :
        <button className='login-button-required' type='button' onClick={() => setShowModal(true)}>Log in to Rent</button>}
      </form>
      {showModal && <Modal onClose={() => setShowModal(false)}>
          <LoginForm callSetter={callSetter}/>
      </Modal>}
    </>
  );
};

export default RentalForm;
