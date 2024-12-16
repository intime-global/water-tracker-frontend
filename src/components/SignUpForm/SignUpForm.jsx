import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { useDispatch } from 'react-redux';
import { useState } from 'react';
// import { register } from '../../redux/auth/operations';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import css from './SignUpForm.module.css';
import sprite from '../../icons/sprite.svg';
// import { ToastContainer, toast } from 'react-toastify';
// import Loader from '../Loader/Loader';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email, please write a valid email')
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email is not valid',
    )
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters.')
    .matches(/^[^\s]*$/, 'Password should not contain spaces.')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function SugnUpForm() {
  // const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  // const handleSubmit = async (values, actions) => {
  //   setIsLoading(true);
  //   try {
  //    dispatch(register(values));
  //     toast.success(
  //       `Your account has been created.`,
  //     );
  //     actions.resetForm();
  //   } catch (error) {
  //     if (error === 'Request failed with status code 409') {
  //       toast.error('This email is already in use.');
  //     } else {
  //       toast.error('An error occurred. Please try again later.');
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className={css.containerForm}>
      <h1 className={css.title}>Sign up</h1>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        // onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form} autoComplete="off">
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
      {/* <ToastContainer /> */}
    </div>
  );
}
