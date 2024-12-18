// import css from './SharedLayout.module.css';
import Header from '../Header/Header.jsx';

export default function SharedLayout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
