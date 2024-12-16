import css from './SharedLayout.module.css';
import Header from '../Header/Header.jsx';

export default function SharedLayout({ children }) {
  return (
    <div className={css.layoutContainer}>
      <Header />
      <main>{children}</main>
    </div>
  );
}
