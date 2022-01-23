import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getListing, newListing, updateListing } from '../../store/surfboard'
import { authenticate } from '../../store/session';
import './form.css';

const SurfboardForm = ({ callSetter, inputBoard }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [location, setLocation] = useState(inputBoard ? inputBoard.location : '');
  const [size, setSize] = useState(inputBoard ? inputBoard.size : 0);
  const [description, setDescription] = useState(inputBoard ? inputBoard.description : '');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector(state => state.session.user);
  const surfboardId = inputBoard?.id
  const text = inputBoard ? 'Edit Listing' : 'Post Listing';
  let inputIMG;
  if (inputBoard) {
    inputIMG = inputBoard.image;
  }

  const onCreate = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (location && size && description) {
      const formData = new FormData();
      formData.append('location', location);
      formData.append('size', size);
      formData.append('description', description)
      formData.append('image', image);
      formData.append('ownerId', sessionUser.id);
      const newSurfboard = await dispatch(newListing(formData));
      dispatch(authenticate());
      callSetter();
      return history.push(`/surfboards/${newSurfboard['id']}/`);
    } else {
      const newErrors = [];
      if (!location) newErrors.push('Please include location of the surfboard.')
      if (!size) newErrors.push('Please include size of the surfboard.')
      if (!description) newErrors.push('Please include a brief description of surfboard.')
      return setErrors(newErrors);
    }
  };

  const onEdit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (location && size && description) {
      const formData = new FormData();
      formData.append('location', location);
      formData.append('size', size);
      formData.append('description', description)
      formData.append('image', image);
      formData.append('ownerId', sessionUser.id);
      await dispatch(updateListing(formData, surfboardId));
      await dispatch(authenticate());
      await dispatch(getListing(surfboardId));
      callSetter();
      return;
    } else {
      const newErrors = [];
      if (!location) newErrors.push('Please include location of the surfboard.')
      if (!size) newErrors.push('Please include size of the surfboard.')
      if (!description) newErrors.push('Please include a brief description of surfboard.')
      return setErrors(newErrors);
    }
  };

  const updateLocation = (e) => {
    setLocation(e.target.value);
  };

  const updateSize = (e) => {
    setSize(parseInt(e.target.value));
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateImage = (e) => {
    setImage(e.target.files[0]);
  }

  return (
    <>
      <form onSubmit={inputBoard ? onEdit : onCreate} className='surfboard-form'>
        <div className='error-box'>
          {errors.length > 0 && errors.map((error, ind) => (
            <div key={ind} className='error'>--{error}</div>
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
            <option value='0'>--Size--</option>
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
        <div className='image-container'>
          {inputIMG && <img className='image-input' alt='' src={inputIMG}/>}
          <div className='optional-tag'>(Optional)</div>
          {inputIMG ? <label htmlFor='image'>Update Image (.png, .jpg, .jpeg):</label> :
          <label htmlFor='image'>Upload Image (.png, .jpg, .jpeg):</label>}
          <input
              type='file'
              name='image'
              accept='.png, .jpg, .jpeg'
              onChange={updateImage}
          />
        </div>
        <button className='surfboard-button' type='submit'>{text}</button>
      </form>
    </>
  );
};

export default SurfboardForm;
