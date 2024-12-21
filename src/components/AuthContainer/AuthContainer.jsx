import css from './AuthContainer.module.css';

export default function AuthContainer({ children}) {
  return <div className={css.background}>{children}</div>;
}
