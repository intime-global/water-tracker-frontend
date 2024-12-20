import css from './PasswordResetPage.module.css';
import AuthContainer from '../../components/AuthContainer/AuthContainer';
import RecoveryForm from '../../components/RecoveryForm/RecoveryForm';

export default function PasswordResetPage() {
  return (
    <AuthContainer>
      <div className={css.passPage}>
        <RecoveryForm />
      </div>
      <RecoveryForm />
    </AuthContainer>
  );
}
