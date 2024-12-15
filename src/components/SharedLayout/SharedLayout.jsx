import css from './SharedLayout.module.css';
import Header from '../Header/Header.jsx';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function SharedLayout({ children }) {
  const [background, setBackground] = useState('welcome');
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/welcome':
        setBackground('welcome');
        break;
      case '/signin':
        setBackground('sign');
        break;
      case '/signup':
        setBackground('sign');
        break;
      case '/home':
        setBackground('home');
        break;
    }
  }, [location.pathname]);

  return (
    <div
      className={`${css.background} ${css[background]}`} /* Використовуємо динамічний класс фону */
    >
      <div className={css.layoutContainer}>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
