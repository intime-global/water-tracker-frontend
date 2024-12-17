import Welcome from '../../components/Welcome/Welcome';
import css from './WelcomePage.module.css';
import AuthContainer from '../../components/AuthContainer/AuthContainer';

const WelcomePage = () => {
  return (
    <AuthContainer>
      <div className={css.welcome}>
        <Welcome />
      </div>
    </AuthContainer>
  );
};

export default WelcomePage;
