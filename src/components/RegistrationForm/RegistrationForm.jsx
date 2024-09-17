import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './RegistrationForm.module.css';
import { NavLink, useLocation } from 'react-router-dom'; // Import useLocation for checking the current path
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';

const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Name is required'),

  email: Yup.string().email('Invalid email format').required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password is too short - should be 6 chars minimum'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [errorText, setErrorText] = useState('');
  const location = useLocation(); 

  const handleSignUp = async (values, { setSubmitting }) => {
    try {
      await dispatch(register(values));
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

  
  const isRegisterPage = location.pathname === '/registration'; 

  return (
    <div className={css.register}>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={registrationSchema}
        onSubmit={handleSignUp}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off" className={css.form}>
            <div className={css.wrapperInput}>
              <div>
                <Field name="name" type="text" placeholder="Name *" className={`${css.input} ${css.user}`} />
                <ErrorMessage name="name" component="div" className={css.error} />
              </div>
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
                className={`${css.btnReg} ${isRegisterPage ? css.active : ''}`} 
              >
                {isSubmitting ? 'Register...' : 'Register'}
              </button>

              <NavLink to="/login">
                <button
                  type="button"
                  className={`${css.btnLogIn} ${!isRegisterPage ? css.active : ''}`} 
                >
                  Log in
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

export default RegistrationForm;
