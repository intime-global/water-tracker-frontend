import { Form, Field, Formik, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useId } from 'react';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import css from './SignInForm.module.css';
import sprite from '../../icons/sprite.svg';

import Loader from '../Loader/Loader.jsx';
import ModalContainer from '../ModalContainer/ModalContainer';
import ForgotPasswordForm from '../ForgotPasswordFrom/ForgotPasswordForm.jsx';
import { login } from '../../redux/user/operations';
import { selectIsLoading } from '../../redux/user/selectors.js';
import { selectAuthError } from '../../redux/user/selectors.js';
import { notifyError } from '../../services/notifications.js';
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton.jsx';

const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegEx, 'Enter a valid email address')
    .required('Email required'),
  password: Yup.string()
    .min(8, 'The password must be at least 8 characters long')
    .max(64, 'The password must be no longer than 64 characters')
    .required('Password required'),
});
const SignInForm = () => {
  // const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // <-- Стан модального вікна
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const emailFieldId = useId();
  const pwdFieldId = useId();
  const isError = useSelector(selectAuthError);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isError) {
      notifyError(isError);
    }
  }, [isError]);

  const handleSubmit = (values, actions) => {
    if (values.email === '' || values.password === '') return;
    dispatch(login(values));
    actions.resetForm();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.formContainer}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={SigninSchema}
      >
        {({ touched, errors }) => (
          <Form className={css.form}>
            <h2 className={css.title}>Sign In</h2>
            <label className={css.label}>
              Enter your email
              <Field
                className={
                  touched.email && errors.email
                    ? clsx(css.input, css.inputError)
                    : css.input
                }
                name="email"
                type="email"
                placeholder="E-mail"
                id={emailFieldId}
              />
              <ErrorMessage
                className={css.error}
                name="email"
                component="span"
              />
            </label>
            <label className={css.label}>
              Enter your password
              <Field
                className={
                  touched.password && errors.password
                    ? css.inputError
                    : css.input
                }
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                id={pwdFieldId}
              />
              <svg
                className={css.icon}
                width={16}
                height={16}
                onClick={(e) => {
                  e.preventDefault();
                  togglePasswordVisibility();
                }}
              >
                <use
                  href={`${sprite}#${
                    showPassword ? 'icon-eye' : 'icon-eye-hidden'
                  }`}
                />
              </svg>
              <ErrorMessage
                className={css.error}
                name="password"
                component="span"
              />
            </label>
            <button className={css.button} type="submit">
              {isLoading ? <Loader /> : 'Sign in'}
            </button>
          </Form>
        )}
      </Formik>
      <GoogleLoginButton />
      <Link to="/signup" className={css.link}>
        Sign up
      </Link>
      <span className={css.forgotPwd} onClick={openModal}>
        Forgot password
      </span>
      {isModalOpen && (
        <ModalContainer>
          <ForgotPasswordForm onClose={closeModal} />
        </ModalContainer>
      )}
    </div>
  );
};

export default SignInForm;
