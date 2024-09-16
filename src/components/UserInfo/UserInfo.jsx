import React from "react";
import css from './UserInfo.module.css';
import { useAuth } from "hooks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/auth/operations";
import { message as notificationMessage } from "antd";

const UserInfo = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(logOut())
            .then(() => {
                localStorage.clear();
                notificationMessage.success('Successfully logged out!');
                navigate('/login');
            })
            .catch(error => {
                notificationMessage.error('Logout failed: ' + error.message);
            });
    };

    if (!user) {
        return null;
    }

    return (
        <>
            <p className={css.user}>
                {user.name}
            </p>
            <button type="button" onClick={handleLogOut} className={css.buttonExit}>
                <span>Exit</span>
            </button>
        </>
    );
};

export default UserInfo;
