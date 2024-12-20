import { useDispatch } from "react-redux"
import { getOauthUrl } from "../../redux/user/operations";
import css from './GoogleLoginButton.module.css'

const GoogleLoginButton = () => {
    const dispatch = useDispatch();

    const handleGoogleLogin = async () => {
        const { data } = await dispatch(getOauthUrl()).unwrap();
        window.location.href = data.url;
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
