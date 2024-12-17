import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { register } from '../../redux/user/operations';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import css from './SignUpForm.module.css';
import sprite from '../../icons/sprite.svg';
import { selectAuthError } from '../../redux/user/selectors.js';
import { notifyError} from '../../services/notifications.js';
// import Loader from '../Loader/Loader';

const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email, please write a valid email')
    .matches(emailRegEx, 'Enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters.')
    .matches(/^[^\s]*$/, 'Password should not contain spaces.')
    .max(64, 'The password must be no longer than 64 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), 'confirmPassword'], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function SugnUpForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const isError = useSelector(selectAuthError);

  useEffect(() => {
    if (isError) {
      notifyError(isError);
    }
  }, [isError]);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  // const handleSubmit = (values, actions) => {
  //   setIsLoading(true);
  //   try {
  //     dispatch(register(values));
  //     notifySuccess(`Your account has been created.`);
  //     actions.resetForm();
  //   } catch (error) {
  //     if (error === 'Request failed with status code 409') {
  //       notifyError('This email is already in use.');
  //     } else {
  //       notifyError('An error occurred. Please try again later.');
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className={css.containerForm}>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={({email, password})=>{
          dispatch(register({email, password}))
        }}
      >
        {({ errors, touched }) => (
          <Form className={css.form} autoComplete="off">
            <h2 className={css.title}>Sign up</h2>
            <label className={css.label}>
              <p className={css.text}>Enter your email</p>
              <Field
                name="email"
                type="email"
                placeholder="E-mail"
                className={
                  errors.email && touched.email
                    ? `${css.input} ${css.inputError}`
                    : css.input
                }
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </label>

            <label className={css.label}>
              <p className={css.text}>Enter your password</p>
              <div className={css.inputContainer}>
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className={
                    errors.password && touched.password
                      ? `${css.input} ${css.inputError}`
                      : css.input
                  }
                />
                <svg
                  className={css.icon}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleShowPassword();
                  }}
                >
                  {showPassword ? (
                    <use href={`${sprite}#icon-eye`} />
                  ) : (
                    <use href={`${sprite}#icon-eye-hidden`} />
                  )}
                </svg>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </label>

            <label className={css.label}>
              <p className={css.text}>Repeat your password</p>
              <div className={css.inputContainer}>
                <Field
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Repeat password"
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? `${css.input} ${css.inputError}`
                      : css.input
                  }
                />

                <svg
                  className={css.icon}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleShowConfirmPassword();
                  }}
                >
                  {showConfirmPassword ? (
                    <use href={`${sprite}#icon-eye`} />
                  ) : (
                    <use href={`${sprite}#icon-eye-hidden`} />
                  )}
                </svg>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={css.error}
              />
            </label>

            <button type="submit" className={css.button}>
              {/* {isLoading ? <Loader /> : 'Sign up'} */}
              Sign up
            </button>
          </Form>
        )}
      </Formik>
      <Link className={css.link} to="/signin">
        Sign in
      </Link>
    </div>
  );
}
