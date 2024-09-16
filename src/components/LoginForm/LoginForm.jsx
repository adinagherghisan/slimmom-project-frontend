import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './LoginForm.module.css';
import { NavLink, useLocation } from 'react-router-dom'; 
import { logIn } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';

const registrationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password is too short - should be 6 chars minimum'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const [errorText, setErrorText] = useState('');
  const location = useLocation(); 

  const handleSignUp = async (values, { setSubmitting }) => {
    try {
      await dispatch(logIn(values));
      setSubmitting(false);
    } catch (error) {
      if (error.request) {
        setErrorText('Network error. Please check your internet connection.');
      } else {
        setErrorText('An error occurred. Please try again.');
      }
      setSubmitting(false);
    }
  };

  const isLoginPage = location.pathname === '/login'; 

  return (
    <div className={css.register}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={registrationSchema}
        onSubmit={handleSignUp}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off" className={css.form}>
            <div className={css.wrapperInput}>
              <div>
                <Field name="email" type="email" placeholder="E-mail *" className={`${css.input} ${css.mail}`} />
                <ErrorMessage name="email" component="div" className={css.error} />
              </div>
              <div>
                <Field name="password" type="password" placeholder="Password *" className={`${css.input} ${css.lock}`} />
                <ErrorMessage name="password" component="div" className={css.error} />
              </div>
            </div>

            <div className={css.button}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${css.btnLogIn} ${isLoginPage ? css.active : ''}`} 
              >
                {isSubmitting ? 'Log in...' : 'Log in'}
              </button>

              <NavLink to="/registration">
                <button
                  type="button"
                  className={`${css.btnReg} ${!isLoginPage ? css.active : ''}`} 
                >
                  Register
                </button>
              </NavLink>
            </div>

            <div className={css.error}>{errorText}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
