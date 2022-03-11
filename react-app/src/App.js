import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import SurfboardListings from './components/SurfboardListings';
import ListingsPage from './components/ListingsPage';
import SplashPage from './components/SplashPage';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <SplashPage />
        </Route>
        <Route path='/surfboards/' exact={true}>
          <div className='whole-page'>
            <div className='main-page'>
              <NavBar />
              <SurfboardListings />
            </div>
          </div>
        </Route>
        <Route path='/surfboards/:surfboardId/' exact={true}>
          <div className='individual-page'>
            <div className='listings-page'>
              <NavBar />
              <ListingsPage />
            </div>
          </div>
        </Route>
        <Route>
          <h1>Page Not Found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
