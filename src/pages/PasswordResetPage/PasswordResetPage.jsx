import AuthContainer from '../../components/AuthContainer/AuthContainer'
import RecoveryForm from '../../components/RecoveryForm/RecoveryForm';

export default function PasswordResetPage() {
  return (
    <AuthContainer>
      <RecoveryForm />
    </AuthContainer>
  );
}
