import AuthContainer from '../../components/AuthContainer/AuthContainer';
import SignInForm from '../../components/SignInForm/SignInForm';
import css from './SignInPage.module.css';

export default function SignInPage() {
  return (
    <AuthContainer>
      <div className={css.sinPage}>
        <SignInForm />
      </div>
    </AuthContainer>
  );
}
