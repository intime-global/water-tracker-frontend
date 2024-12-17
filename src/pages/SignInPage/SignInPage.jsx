// import Auscontainer from '../../components/Auscontainer';
import SignInForm from '../../components/SignInForm/SignInForm';
import SigninPageBackgrCard from '../../components/SigninPageBackgrCard/SigninPageImageCard';
import css from './SignInPage.module.css';
export default function SugnInPage() {
  return (
    // <Auscontainer>
    <div className={css.pageContainer}>
      <div className={css.pageFlexContainer}>
        <SignInForm />
        <SigninPageBackgrCard />
      </div>
    </div>
    // <Auscontainer />
  );
}
