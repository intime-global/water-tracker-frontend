import SignUpForm from '../../components/SignUpForm/SignUpForm';
import css from './SignUpPage.module.css';
export default function SignUpPage() {
  return (
    <div className={css.container}>
      <SignUpForm />
    </div>
  );
}
