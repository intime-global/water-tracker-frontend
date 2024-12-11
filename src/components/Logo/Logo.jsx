import css from './Logo.module.css';
import { NavLink } from 'react-router-dom';
import LogoSvg from '../../icons/logo.svg';

const Logo = () => {
  return (
    <nav className={css.nav}>
      <NavLink className={css.logoLink} to="/welcome">
        <svg className={css.logoIcon}>
          <use href={LogoSvg} />
        </svg>
      </NavLink>
    </nav>
  );
};

export default Logo;
