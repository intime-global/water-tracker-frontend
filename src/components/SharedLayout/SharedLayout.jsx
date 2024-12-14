import css from './SharedLayout.module.css';
import Header from '../Header/Header.jsx';
import Loader from '../Loader/Loader.jsx';
import { Suspense } from 'react';

export default function SharedLayout({ children }) {
  return (
    <div className={css.layoutContainer}>
      <Header />
      <main>
        <Suspense fallback={Loader}>{children}</Suspense>
      </main>
    </div>
  );
}
