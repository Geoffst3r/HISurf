import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import SurfboardListings from './components/SurfboardListings';
import ListingsPage from './components/ListingsPage';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true}>
          <h1>My Home Page</h1>
        </Route>
        <Route path='/surfboards/' exact={true}>
          <div className='main-page'>
            <SideBar />
            <SurfboardListings />
          </div>
        </Route>
        <Route path='/surfboards/:surfboardId/'>
          <div className='listings-page'>
            <SideBar />
            <ListingsPage />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
