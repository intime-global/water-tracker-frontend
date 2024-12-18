import AuthContainer from '../../components/AuthContainer/AuthContainer';
import SignInForm from '../../components/SignInForm/SignInForm';
import SigninPageBackgrCard from '../../components/SigninPageBackgrCard/SigninPageImageCard';
import css from './SignInPage.module.css';
export default function SugnInPage() {
  return (
    <AuthContainer>
      <div className={css.pageContainer}>
        <div className={css.pageFlexContainer}>
          <div className="item item1">
            <SignInForm />
          </div>
          <div className="item item2">
            <SigninPageBackgrCard />
          </div>
        </div>
      </div>
    </AuthContainer>
  );
}
