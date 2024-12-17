import { Formik, Form, Field} from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

const SignUpForm = ({ submitFunc, token }) => {
  const registerSchema = yup.object({
    password: yup.string()
      .min(8, 'Password must be at least 8 characters length')
      .max(64).matches(/^[^\s]*$/, 'Password should not contain spaces.')
      .required('Password is required'),
    repeatPassword: yup
      .string()
      .when([yup.ref('password'), null], 'Passwords must match'),
  });
   const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleShowRepeatPassword = () => {
    setShowRepeatPassword((prevState) => !prevState);
  }

  const initialValues = {
    password: '',
    repeatPassword: '',
    token: token,
  };

  function handleSubmit(values, actions) {
    submitFunc(values.token, values.password);
    actions.resetForm();
  }

//   function watchPassFunc(evt) {
//     const evtTarget = evt.target.closest('.watchPasswordIcon').previousSibling;
//     if (evtTarget.type === 'password') {
//       evtTarget.type = 'text';
//       evt.target.closest('SVG').firstChild.href.baseVal =
//         sprite + '#eye-opened';
//       return;
//     }
//     if (evtTarget.type === 'text') {
//       evtTarget.type = 'password';
//       evt.target.closest('SVG').firstChild.href.baseVal =
//         sprite + '#eye-closed';
//       return;
//     }
//   }

  return (
    <>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          <Form className="form" autoComplete="off">
            <Field type="hidden" name='token'/>
            <label className="label" htmlFor="password">
              Enter your password
                <Field
                  className="input"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
            </label>

            <label className="label" htmlFor="repeatPassword">
              Repeat password
                <Field
                  className="input"
                  type="password"
                  name="repeatPassword"
                  placeholder="Repeat password"
                />
            </label>
            <br />

            <button className="buttonSignUp" type="submit">
              Reset Password
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default SignUpForm;
