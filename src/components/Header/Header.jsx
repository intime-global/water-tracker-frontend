import css from './Header.module.css';
import Logo from '../Logo/Logo.jsx';
import UserAuth from '../UserAuth/UserAuth';

const Header = () => {
  return (
    <header className={css.headerContainer}>
      <Logo />
      <UserAuth />
    </header>
  );
};

export default Header;
