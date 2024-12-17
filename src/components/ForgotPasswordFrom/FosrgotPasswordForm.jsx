import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch} from 'react-redux';
import * as Yup from 'yup';
import css from './ForgotPasswordForm.module.css';
import { sendResetPasswordEmail } from '../../redux/user/operations.js';
import { notifyError, notifySuccess } from '../../services/notifications.js';

const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegEx, 'Enter a valid email address')
    .required('Email is required'),
});

const ForgotPasswordForm = ({ onSubmit }) => {
     const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    try {
      dispatch(sendResetPasswordEmail(values.email)).unwrap();
      onSubmit(values.email);
      actions.resetForm();
      notifySuccess(`Message sent. Check your email.`);
    } catch {
      notifyError('Something went wrong.');
   };
  }

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
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ForgotPasswordForm;
