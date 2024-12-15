import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

// import { refresh } from './redux/auth/operations';
// import { selectIsRefreshing } from './redux/auth/selectors';

import RestrictedRoute from './components/UserMenu/RestrictedRoute';
import PrivateRoute from './components/UserMenu/PrivateRoute';
import Loader from './components/Loader/Loader';
import SharedLayout from './components/SharedLayout/SharedLayout';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const WelcomePage = lazy(() => import('./pages/WelcomePage/WelcomePage'));
// const SigninPage = lazy(() => import('./pages/SigninPage/SigninPage'));
// const SignupPage = lazy(() => import('./pages/SignupPage/SignupPage'));

function App() {
  // const dispatch = useDispatch();
  // const isRefreshing = useSelector(selectIsRefreshing);

  // useEffect(() => {
  //   dispatch(refresh());
  // }, [dispatch]);

  // if (isRefreshing) {
  //   return <Loader />;
  // }

  return (
    <div>
      <ToastContainer limit={3} />
      <SharedLayout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              index
              element={
                <RestrictedRoute
                  redirectTo="/welcome"
                  component={<WelcomePage />}
                />
              }
            />
            {/* <Route
              path="/signup"
              element={
                <RestrictedRoute
                  component={<SignupPage />}
                  redirectTo="/signin"
                />
              }
            />
            <Route
              path="/signin"
              element={
                <RestrictedRoute
                  component={<SigninPage />}
                  redirectTo="/home"
                />
              }
            /> */}
            <Route
              path="/home"
              element={
                <PrivateRoute redirectTo="/signin" component={<HomePage />} />
              }
            />
          </Routes>
        </Suspense>
      </SharedLayout>
    </div>
  );
}
export default App;
