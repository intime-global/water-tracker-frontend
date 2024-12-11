import { Outlet } from 'react-router-dom';
import css from './SharedLayout.module.css';
import Header from '../Header/Header.jsx';
import Loader from '../Loader/Loader.jsx';
import { Suspense } from 'react';

export default function SharedLayout() {
  return (
    <div className={css.layoutContainer}>
      <Header />
      <main>
        <Suspense fallback={Loader}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
