import css from './AuthContainer.module.css';

export default function AuthContainer({ children }) {
  return (
    <div className={css.background}>
      <div className={css.container}>{children}</div>
    </div>
  );
}
