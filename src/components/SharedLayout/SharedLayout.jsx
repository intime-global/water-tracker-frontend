// import css from './SharedLayout.module.css';
import Header from '../Header/Header.jsx';

export default function SharedLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
