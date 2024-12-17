import css from './AuthContainer.module.css';

export default function AuthContainer({ children, className }) {
  return <div className={`${css.background} ${className}`}>{children}</div>;
}
