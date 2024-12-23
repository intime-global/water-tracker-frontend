import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import sprite from '../../icons/sprite.svg';
import css from './ForgotPasswordForm.module.css';
import { sendResetPasswordEmail } from '../../redux/user/operations.js';

const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegEx, 'Enter a valid email address')
    .required('Email is required'),
});

const ForgotPasswordForm = ({ onSubmit, onClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(sendResetPasswordEmail(values)).unwrap();
    onSubmit(values);
    actions.resetForm();
    onClose();
  };

  return (
    <div className={css.containerModal}>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <label className={css.label}>
              Enter your registered email
              <Field
                className={
                  errors.email && touched.email
                    ? `${css.input} ${css.inputError}`
                    : css.input
                }
                name="email"
                type="email"
                placeholder="E-mail"
              />
              <ErrorMessage
                className={css.error}
                name="email"
                component="div"
              />
            </label>
            <button className={css.button} type="submit">
              Send
            </button>
            <svg className={css.icon} onClick={onClose}>
              <use href={`${sprite}#icon-close`} />
            </svg>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPasswordForm;
