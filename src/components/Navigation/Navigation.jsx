import React from 'react';
import css from './Navigation.module.css'
import { Link } from 'react-router-dom';

const Navigation = () => (
    <nav className={css.nav}>
        <ul className={css.list}>
            <li className={css.link}><Link to="/login">Log in</Link></li>
            <li className={css.link}><Link to="/registration">Registration</Link></li>
        </ul>
    </nav>
);

export default Navigation;