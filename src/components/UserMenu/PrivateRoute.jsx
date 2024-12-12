// import { useSelector } from 'react-redux';
// import { selectIsLoggedIn } from '../../redux/user/selectors';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ Component, redirectTo = '/home' }) {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoggedIn = false;

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
}
