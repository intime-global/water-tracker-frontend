import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { refreshUser } from '../../redux/auth/operations';
// import { selectIsRefreshing } from '../../redux/auth/selectors';

import RestrictedRoute from './components/UserMenu/RestrictedRoute';
import PrivateRoute from './components/UserMenu/PrivateRoute';
import Loader from './components/Loader/Loader';
import SharedLayout from './components/SharedLayout/SharedLayout';

import './App.css';

// const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
// const WelcomePage = lazy(() => import('./pages/WelcomePage/WelcomePage'));
// const SigninPage = lazy(() => import('./pages/SigninPage/SigninPage'));
// const SignupPage = lazy(() => import('./pages/SignupPage/SignupPage'));

function App() {
  // const dispatch = useDispatch();
  // const isRefreshing = useSelector(selectIsRefreshing);

  // useEffect(() => {
  //   dispatch(refreshUser());
  // }, [dispatch]);

  // if (isRefreshing) {
  //   return <Loader />;
  // }

  return (
    <div>
      <SharedLayout>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* <Route
              index
              element={
                <RestrictedRoute
                  redirectTo="/welcome"
                  component={<WelcomePage />}
                />
              }
            /> */}
            {/* <Route
              path="/signup"
              element={
                <RestrictedRoute
                  component={<SignupPage />}
                  redirectTo="/signup"
                />
              }
            /> */}
            {/* <Route
              path="/signin"
              element={
                <RestrictedRoute
                  component={<SigninPage />}
                  redirectTo="/signin"
                />
              }
            /> */}
            {/* <Route
              path="/home"
              element={
                <PrivateRoute redirectTo="/signin" component={<HomePage />} />
              }
            /> */}
          </Routes>
        </Suspense>
      </SharedLayout>
    </div>
  );
}
export default App;
