// import AuthContainer from '../../components/AuthContainer/AuthContainer.jsx';
import Welcome from '../../components/Welcome/Welcome';
import css from './WelcomePage.module.css';

const WelcomePage = () => {
  return (
    <div className={`${css.welcome}`}>
      <Welcome />
    </div>
  );
};

export default WelcomePage;
