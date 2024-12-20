// import { useDispatch} from "react-redux"
// import { getOauthUrl } from "../../redux/user/operations";
import { notifyError } from "../../services/notifications";
import css from './GoogleLoginButton.module.css'
import axios from "axios";

// import { selectIsLoading } from "../../redux/user/selectors";
// import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const isLoading = useSelector(selectIsLoading);

    const handleGoogleLogin = async () => {
        try {
    const response = await axios.get('http://localhost:3000/auth/get-oauth-url');
    console.log('Full response:', response);
    const { data: { url } } = response;
    console.log('URL:', url);
  } catch (error) {
    console.error('Error:', error);
    notifyError(error.message);
  }
};

    return (
        <>
            <button onClick={handleGoogleLogin} className={css.button}>
                Login with Google
            </button>
        </>
    );

};

export default GoogleLoginButton;
