// import { useDispatch} from "react-redux"
// import { getOauthUrl } from "../../redux/user/operations";
import { notifyError } from '../../services/notifications';
import css from './GoogleLoginButton.module.css';
import axios from 'axios';

import { FcGoogle } from 'react-icons/fc';

// import { selectIsLoading } from "../../redux/user/selectors";

const GoogleLoginButton = () => {
  // const dispatch = useDispatch();
  // const isLoading = useSelector(selectIsLoading);

  const handleGoogleLogin = async () => {
    try {
      const {
        data: {
          data: { url },
        },
      } = await axios.get('http://localhost:3000/auth/get-oauth-url');
      console.log('URL:', url);
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
      notifyError(error.message);
    }
  };

  return (
    <>
      <button onClick={handleGoogleLogin} className={css.button}>
        <span>Login with Google</span>
        <FcGoogle size={25} />
      </button>
    </>
  );
};

export default GoogleLoginButton;
