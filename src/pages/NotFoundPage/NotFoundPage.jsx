import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={css.notFoundContainer}>
      <h2 className={css.title}>404: Page Not Found</h2>
      <p className={css.suggestion}>
        The page you are looking for doesn’t exist or is temporarily
        unavailable.
      </p>
      <p className={css.suggestion}>
        Return
        <Link className={css.link} to="/">
          Home
        </Link>
        or try again later.
      </p>
    </div>
  );
}
