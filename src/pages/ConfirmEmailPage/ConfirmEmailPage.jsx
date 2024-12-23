import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { notifyError, notifySuccess } from "../../services/notifications";
import { useEffect } from "react";

const authAPI = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const ConfirmEmailPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const handleEmailConfirmation = async () => {
    try {
        const response = await authAPI.post('/auth/confirm-email', { token: token });
      if (!response.status==='201') {
        throw new Error('Email confirmation failed');
      }

      notifySuccess('Email successfully confirmed!');
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } catch (error) {
      console.error(error);
        notifyError('Failed to confirm email. Please try again.');
        setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

    useEffect(() => {handleEmailConfirmation()

    }, []);

    return <>
      <h1>Confirming Email...</h1>
      <p>Please wait while we confirm your email.</p>
    </>;
};

export default ConfirmEmailPage;
