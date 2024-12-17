import css from './Header.module.css';
import Logo from '../Logo/Logo.jsx';
import UserAuth from '../UserAuth/UserAuth.jsx';
import UserLogo from '../UserLogo/UserLogo.jsx';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/user/selectors.js';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <header className={css.headerContainer}>
      <Logo isAuthenticated={isLoggedIn} />
      {isLoggedIn ? <UserLogo user={user} /> : <UserAuth />}
    </header>
  );
};

export default Header;
