import Welcome from '../../components/Welcome/Welcome';
import css from './WelcomePage.module.css';

const WelcomePage = () => {
  return (
    <div className={css.background}>
      <Welcome className={css.content} />
    </div>
  );
};

export default WelcomePage;
