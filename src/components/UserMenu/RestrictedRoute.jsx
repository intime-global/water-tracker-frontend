import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/user/selectors';
import { Navigate } from 'react-router-dom';

export default function RestrictedRoute({ Сomponent, redirectTo = '/home' }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Сomponent;
}
