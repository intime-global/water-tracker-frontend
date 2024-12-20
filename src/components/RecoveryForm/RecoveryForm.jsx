import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import css from './RecoveryForm.module.css';
import * as yup from 'yup';
import { resetPassword } from '../../redux/user/operations';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { selectIsLoading } from '../../redux/user/selectors';
import sprite from '../../icons/sprite.svg';
import Loader from '../Loader/Loader';

const registerSchema = yup.object({
    password: yup.string()
      .min(8, 'Password must be at least 8 characters length')
      .max(64).matches(/^[^\s]*$/, 'Password should not contain spaces.')
      .required('Password is required'),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password field must be filled'),
});


const RecoveryForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const isLoading = useSelector(selectIsLoading);

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const toggleShowRepeatPassword = () => {
    setShowRepeatPassword((prevState) => !prevState);
  };

  const initialValues = {
    password: '',
    repeatPassword: '',
    token,
  };


  async function handleSubmit(values, actions) {
      dispatch(resetPassword({ token: values.token, password: values.password }));
      actions.resetForm();
      navigate('/signin');
  }

  return (
    <>
      <div className={css.formContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
                    <Form className={css.form} autoComplete="off">
                      <h2 className={css.title}>Reset password</h2>
                      <label className={css.label}>
                        <p className={css.text}>Enter your new password</p>
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
                        <p className={css.text}>Repeat your new password</p>
                        <div className={css.inputContainer}>
                          <Field
                            name="repeatPassword"
                            type={showRepeatPassword ? 'text' : 'password'}
                            placeholder="Repeat password"
                            className={
                              errors.repeatPassword && touched.repeatPassword
                                ? `${css.input} ${css.inputError}`
                                : css.input
                            }
                          />

                          <svg
                            className={css.icon}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleShowRepeatPassword();
                            }}
                          >
                            {showRepeatPassword ? (
                              <use href={`${sprite}#icon-eye`} />
                            ) : (
                              <use href={`${sprite}#icon-eye-hidden`} />
                            )}
                          </svg>
                        </div>
                        <ErrorMessage
                          name="repeatPassword"
                          component="div"
                          className={css.error}
                        />
                      </label>

                      <button type="submit" className={css.button}>
                        {isLoading ? <Loader /> : 'Reset Password'}
                      </button>
                    </Form>
                  )}
        </Formik>
      </div>
    </>
  );
};

export default RecoveryForm;
