import css from './Logo.module.css';
import { NavLink } from 'react-router-dom';
import LogoSvg from '../../icons/logo.svg?react';

const Logo = () => {
  return (
    <nav className={css.nav}>
      <NavLink className={css.logoLink} to="/welcome">
        <LogoSvg className={css.logoIcon} />
      </NavLink>
    </nav>
  );
};

export default Logo;
