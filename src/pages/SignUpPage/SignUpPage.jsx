import AuthContainer from '../../components/AuthContainer/AuthContainer';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
// import css from './SignUpPage.module.css';
export default function SignUpPage() {
  return (
    <AuthContainer>
      <>
        <SignUpForm />
      </>
    </AuthContainer>
  );
}
