import { useDispatch } from "react-redux"
import { getOauthUrl } from "../../redux/user/operations";
import { notifyError } from "../../services/notifications";
import css from './GoogleLoginButton.module.css'
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleLogin = async () => {
        try {
            const { url } = await dispatch(getOauthUrl()).unwrap();
            console.log(url);
            navigate(url);
            // window.location.href = url;
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
