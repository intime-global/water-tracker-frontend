import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { refresh } from './redux/user/operations';
import { selectIsRefreshing } from './redux/user/selectors';

import RestrictedRoute from './components/UserMenu/RestrictedRoute';
import PrivateRoute from './components/UserMenu/PrivateRoute';
import Loader from './components/Loader/Loader';
import SharedLayout from './components/SharedLayout/SharedLayout';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';

const HomePage = lazy(() => import('./pages/WelcomePage/WelcomePage'));
const WelcomePage = lazy(() => import('./pages/WelcomePage/WelcomePage'));
const SigninPage = lazy(() => import('./pages/SignInPage/SignInPage'));
const SignupPage = lazy(() => import('./pages/SignUpPage/SignUpPage'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader />;
  }

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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </SharedLayout>
    </div>
  );
}
export default App;
