import { useDispatch } from 'react-redux';
import { getOauthUrl } from '../../redux/user/operations';
import { notifyError } from '../../services/notifications';
import css from './GoogleLoginButton.module.css';

import { FcGoogle } from 'react-icons/fc';

const GoogleLoginButton = ({children}) => {
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    try {
      const {
        data: { url },
      } = await dispatch(getOauthUrl()).unwrap();
      window.location.href = url;
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <>
      <button onClick={handleGoogleLogin} className={css.button}>
        <span>{children}</span>
        <FcGoogle size={25} />
      </button>
    </>
  );
};

export default GoogleLoginButton;
