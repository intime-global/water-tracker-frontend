import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/user/selectors';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ component, redirectTo = '/home' }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
}
