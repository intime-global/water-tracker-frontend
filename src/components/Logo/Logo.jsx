import css from './Logo.module.css';
import { NavLink } from 'react-router-dom';
import LogoSvg from '../../icons/logo.svg?react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/user/selectors.js';

const Logo = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={css.nav}>
      <NavLink className={css.logoLink} to={isLoggedIn ? '/home' : '/welcome'}>
        <LogoSvg className={css.logoIcon} />
      </NavLink>
    </nav>
  );
};

export default Logo;
