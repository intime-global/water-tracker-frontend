import css from './PasswordResetPage.css';
import RecoveryForm from '../../components/RecoveryForm/RecoveryForm';

export default function PasswordResetPage () {

  return (
    <div className={css.pageContainer}>
      <RecoveryForm />
    </div>
  );
};

