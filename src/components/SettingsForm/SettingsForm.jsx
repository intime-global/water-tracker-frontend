import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { editUserInfoThunk } from '../../redux/user/operations.js';
import { selectIsLoading, selectUser } from '../../redux/user/selectors.js';
import { notifySuccess } from '../../services/notifications.js';
import sprite from '../../icons/sprite.svg';
import css from './SettingsForm.module.css';

export default function SettingsForm({ onClose }) {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);

  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState(false);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    gender: Yup.string().oneOf(['male', 'female']),
    name: Yup.string().max(32, 'Max 32 letters!'),
    email: Yup.string().email('Use a valid email!').required('Required!'),
    oldPassword: Yup.string()
      .min(8, 'Min 8 characters!')
      .max(64, 'Max 64 characters'),
    newPassword: Yup.string()
      .min(8, 'Min 8 characters!')
      .max(64, 'Max 64 characters'),
    repeatPassword: Yup.string().oneOf(
      [Yup.ref('newPassword')],
      "Password doesn't match!",
    ),
  });

  const initialValues = {
    gender: user?.gender || 'female',
    name: user?.name || '',
    email: user?.email || '',
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  };

  const validateInputs = (values) => {
    const errors = {};
    const fields = [
      values.oldPassword,
      values.newPassword,
      values.repeatPassword,
    ];
    const allEmpty = fields.every((field) => !field);
    const allFilled = fields.every((field) => field);
    if (!allEmpty && !allFilled) {
      errors.inputs = 'All password fields must be filled or empty!';
    }
    return errors;
  };

  const handleOldPasswordVisibility = () => {
    setIsOldPasswordVisible(!isOldPasswordVisible);
  };

  const handleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  const handleRepeatPasswordVisibility = () => {
    setIsRepeatPasswordVisible(!isRepeatPasswordVisible);
  };

  const handleSubmit = (values) => {
    const { repeatPassword, oldPassword, newPassword, ...filteredValues } =
      values;

    if (oldPassword && newPassword) {
      filteredValues.oldPassword = oldPassword;
      filteredValues.newPassword = newPassword;
    }

    dispatch(editUserInfoThunk(filteredValues));
    notifySuccess('Data has successfully changed!');
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validate={validateInputs}
    >
      {({ errors }) => (
        <Form>
          <div className={css.flexContainer}>
            <div>
              <h3 className={css.subtitle}>Your gender identity</h3>
              <div className={css.radioGroup}>
                <label className={`${css.label}`}>
                  <Field
                    type="radio"
                    name="gender"
                    value="female"
                    className={css.radio}
                  />
                  <span className={css.customRadio}></span>
                  Woman
                </label>

                <label className={`${css.label}`}>
                  <Field
                    type="radio"
                    name="gender"
                    value="male"
                    className={css.radio}
                  />
                  <span className={css.customRadio}></span>
                  Man
                </label>
              </div>

              <div className={css.inputWrap}>
                <label htmlFor="name" className={css.subtitle}>
                  Your name
                </label>
                <Field
                  name="name"
                  placeholder="Name"
                  id="name"
                  className={css.input}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.inputWrap}>
                <label
                  htmlFor="email"
                  className={`${css.subtitle} ${css.resetMargin}`}
                >
                  E-mail
                </label>
                <Field
                  name="email"
                  placeholder="Email"
                  id="email"
                  className={css.input}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />
              </div>
            </div>

            <div>
              <h3 className={css.subtitle}>Password</h3>

              <div className={css.inputWrap}>
                <label htmlFor="oldPassword" className={css.label}>
                  Outdated password:
                </label>
                <Field
                  type={isOldPasswordVisible ? 'text' : 'password'}
                  name="oldPassword"
                  id="oldPassword"
                  placeholder="Password"
                  className={css.input}
                />
                <button
                  type="button"
                  onClick={handleOldPasswordVisibility}
                  aria-label="Toggle password visibility"
                  className={css.passwordVisibility}
                >
                  <svg width={16} height={16} className={css.icon}>
                    <use
                      href={
                        isOldPasswordVisible
                          ? `${sprite}#icon-eye`
                          : `${sprite}#icon-eye-hidden`
                      }
                    />
                  </svg>
                </button>
                <ErrorMessage
                  name="oldPassword"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.inputWrap}>
                <label htmlFor="newPassword" className={css.label}>
                  New Password:
                </label>
                <Field
                  type={isNewPasswordVisible ? 'text' : 'password'}
                  name="newPassword"
                  id="newPassword"
                  placeholder="Password"
                  className={css.input}
                />
                <button
                  type="button"
                  onClick={handleNewPasswordVisibility}
                  aria-label="Toggle password visibility"
                  className={css.passwordVisibility}
                >
                  <svg width={16} height={16} className={css.icon}>
                    <use
                      href={
                        isNewPasswordVisible
                          ? `${sprite}#icon-eye`
                          : `${sprite}#icon-eye-hidden`
                      }
                    />
                  </svg>
                </button>
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.inputWrap} style={{ marginBottom: '0px' }}>
                <label htmlFor="repeatPassword" className={css.label}>
                  Repeat new password:
                </label>
                <Field
                  type={isRepeatPasswordVisible ? 'text' : 'password'}
                  name="repeatPassword"
                  id="repeatPassword"
                  placeholder="Password"
                  className={css.input}
                />
                <button
                  type="button"
                  onClick={handleRepeatPasswordVisibility}
                  aria-label="Toggle password visibility"
                  className={css.passwordVisibility}
                >
                  <svg width={16} height={16} className={css.icon}>
                    <use
                      href={
                        isRepeatPasswordVisible
                          ? `${sprite}#icon-eye`
                          : `${sprite}#icon-eye-hidden`
                      }
                    />
                  </svg>
                </button>
                <ErrorMessage
                  name="repeatPassword"
                  component="div"
                  className={css.error}
                />
              </div>
            </div>
          </div>

          {errors.inputs && (
            <div className={css.commonError}>{errors.inputs}</div>
          )}

          <div className={css.btnWrap}>
            <button type="submit" className={css.submit} disabled={isLoading}>
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
