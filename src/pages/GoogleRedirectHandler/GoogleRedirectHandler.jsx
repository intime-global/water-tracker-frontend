import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom";
import { notifyError } from "../../services/notifications";
import { confirmOauth } from "../../redux/user/operations";


const GoogleRedirectHandler = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const handleGoogleAuth = async () => {

            const code = searchParams.get('code');

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
    }, [dispatch, navigate, searchParams]);

    return <div>Processing Google Authorization...</div>;
};

export default GoogleRedirectHandler;
