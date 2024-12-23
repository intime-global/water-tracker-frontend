// import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import { notifyError, notifySuccess } from '../../services/notifications';
import { useEffect } from 'react';
// import { setAuthHeader } from '../../services/axios.config';
import { useDispatch } from 'react-redux';
import { confirmEmail } from '../../redux/user/operations';

// const authAPI = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_SERVER_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

const ConfirmEmailPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const dispatch = useDispatch();

  const handleEmailConfirmation = async () => {
    try {
      await dispatch(confirmEmail({ token }));
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    } catch (error) {
      console.error(error);
      // notifyError('Failed to confirm email. Please try again.');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  useEffect(() => {
    handleEmailConfirmation();
  }, []);

  return (
    <>
      <h1>Confirming Email...</h1>
      <p>Please wait while we confirm your email.</p>
    </>
  );
};

export default ConfirmEmailPage;
