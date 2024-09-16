import React from "react";
import css from './LoginPage.module.css';
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {
    return (
         <div className={css.container}>
            <h1>Register</h1>
            <LoginForm/>
        </div>
    )
};

export default LoginPage;