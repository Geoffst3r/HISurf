import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { newListing } from '../../store/surfboard'
import { authenticate } from '../../store/session';
import './form.css';

const SurfboardForm = ({ callSetter, inputBoard }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');
  const [size, setSize] = useState(0);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector(state => state.session.user);

  const onCreate = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (location && size && description) {
        const requestSurfboard = { location, size, description, 'ownerId': sessionUser.id };
        let newSurfboard = await dispatch(newListing(requestSurfboard));
        callSetter();
        dispatch(authenticate());
        return history.push(`/surfboards/${newSurfboard['id']}/`);
    } else {
        const newErrors = [];
        if (!location) newErrors.push('Please include location of the surfboard.')
        if (!size) newErrors.push('Please include size of the surfboard.')
        if (!description) newErrors.push('Please include a brief description of surfboard.')
        return setErrors(newErrors);
    }
  };

//   const onEdit = async (e) => {
//     e.preventDefault();
//     setErrors([]);
//     const requestChannel = { id: inputChannel.id, title, serverId };
//     await dispatch(updateChannel(requestChannel))
//       .catch(async (res) => {
//         const data = await res.json();
//         if (data && data.errors) return setErrors(data.errors);
//       });
//     callSetter();
//     return
//   };

  const updateLocation = (e) => {
    setLocation(e.target.value);
  };

  const updateSize = (e) => {
    setSize(parseInt(e.target.value));
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <>
      <form onSubmit={onCreate} className='surfboard-form'>
        <div className='surfboard-error-box'>
          {errors.length > 0 && errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <select value={location} onChange={updateLocation}>
            <option value=''>--Island--</option>
            <option value='Oahu'>Oahu</option>
            <option value='Maui'>Maui</option>
            <option value='Big Island'>Big Island</option>
            <option value='Kaui'>Kauai</option>
            <option value='Molokai'>Molokai</option>
            <option value='Lanai'>Lanai</option>
        </select>
        <select value={size} onChange={updateSize}>
            <option value=''>--Size--</option>
            <option value='6'>6'</option>
            <option value='7'>7'</option>
            <option value='8'>8'</option>
            <option value='9'>9'</option>
            <option value='10'>10'</option>
            <option value='11'>11'</option>
        </select>
        <textarea
            placeholder='Description'
            name='description'
            type='text'
            value={description}
            onChange={updateDescription}
            required
            autoComplete="off"
        />
        <button className='surfboard-button' type='submit'>Post Listing</button>
      </form>
    </>
  );
};

export default SurfboardForm;
