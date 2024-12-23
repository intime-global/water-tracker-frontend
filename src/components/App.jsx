import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { refresh, getUser } from '../redux/user/operations';
import {
  selectIsRefreshing,
  selectAccessToken,
  // selectIsLoading,
} from '../redux/user/selectors';

import RestrictedRoute from './UserMenu/RestrictedRoute';
import PrivateRoute from './UserMenu/PrivateRoute';
import Loader from './Loader/Loader';
import SharedLayout from './SharedLayout/SharedLayout';
import PasswordResetPage from '../pages/PasswordResetPage/PasswordResetPage.jsx';

import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.jsx';
import ConfirmEmailPage from '../pages/ConfirmEmailPage/ConfirmEmailPage.jsx';
const GoogleRedirectHandler = lazy(() => import('../pages/GoogleRedirectHandler/GoogleRedirectHandler.jsx'))
// import GoogleRedirectHandler from '../pages/GoogleRedirectHandler/GoogleRedirectHandler.jsx';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const WelcomePage = lazy(() => import('../pages/WelcomePage/WelcomePage'));
const SigninPage = lazy(() => import('../pages/SignInPage/SignInPage'));
const SignupPage = lazy(() => import('../pages/SignUpPage/SignUpPage'));

function App() {
  const dispatch = useDispatch();
  // const isLoading = useSelector(selectIsLoading);
  const isRefreshing = useSelector(selectIsRefreshing);
  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  useEffect(() => {
    const firstLogIn = () => {
      if (accessToken) {
        dispatch(getUser());
      }
    };
    firstLogIn();
  }, [accessToken, dispatch]);

  if (isRefreshing) {
    return <Loader />;
  }

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <div>
      <ToastContainer limit={3} />
      <SharedLayout>

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route
              index
              element={
                <RestrictedRoute
                  redirectTo="/home"
                  component={<WelcomePage />}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <RestrictedRoute component={<SignupPage />} redirectTo="/" />
              }
            />
            <Route path="/confirm-email"
              element={<RestrictedRoute
                component={<ConfirmEmailPage />}
                redirectTo='/home' />} />

            <Route
              path="/signin"
              element={
                <RestrictedRoute
                  component={<SigninPage />}
                  redirectTo="/home"
                />
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute redirectTo="/signin" component={<HomePage />} />
              }
            />
            <Route
              path="/reset-pwd"
              element={
                <RestrictedRoute
                  redirectTo="/home"
                  component={<PasswordResetPage />}
                />
              }
            />
            <Route path="/googleauth" element={<RestrictedRoute
              component={<GoogleRedirectHandler />}
              redirectTo='/home' />}/>

            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </Suspense>
      </SharedLayout>
    </div>
  );
}
export default App;
