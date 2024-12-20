import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { notifyError } from "../../services/notifications";
import { confirmOauth } from "../../redux/user/operations";



const GoogleRedirectHandler = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleGoogleAuth = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (!code) {
                notifyError('Authorization code not found');
                navigate('/login');
                return;
            };

            try {
                await dispatch(confirmOauth({ code })).unwrap();
                navigate('/home')
            } catch (error) {
                notifyError(error.message)
                navigate('/login')
            }
        };
        handleGoogleAuth();
    }, [dispatch, navigate]);

    return <div>Processing Google Authorization...</div>;
};

export default GoogleRedirectHandler;
