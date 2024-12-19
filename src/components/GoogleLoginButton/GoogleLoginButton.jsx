import { useDispatch } from "react-redux"
import { getOauthUrl } from "../../redux/user/operations";
import { notifyError } from "../../services/notifications";
import css from './GoogleLoginButton.module.css'

const GoogleLoginButton = () => {
    const dispatch = useDispatch();

    const handleGoogleLogin = async () => {
        try {
            const { data } = await dispatch(getOauthUrl()).unwrap();
            window.location.href = data.url;
        } catch (error) {
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
