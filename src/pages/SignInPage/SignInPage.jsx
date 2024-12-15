import SignInForm from '../../components/SignInForm/SignInForm';
import css from './SignInPage.module.css';
export default function SugnInPage() {
  return (
    <div className={css.pageContainer}>
      <SignInForm />
    </div>
  );
}
