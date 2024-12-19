import css from './BackgroundContainer.module.css';

export default function BackgroundContainer({ children }) {
  return <div className={css.backgroundContainer}>{children}</div>;
}
