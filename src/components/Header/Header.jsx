import React from "react";
import css from './Header.module.css';
import { useAuth } from "hooks";
import Logo from "components/Logo/Logo";
import Navigation from "components/Navigation/Navigation";
import MenuMobile from "components/MenuMobile/MenuMobile";
import UserInfo from "components/UserInfo/UserInfo";


const Header = () => {
    const { isLoggedIn } = useAuth();
   

    return (
        <>
            <header className={css.header}>
                <div className={css.logo}>
                    <Logo />
                </div>
                <div className={css.wrapper}>
                    <div className={css.verticalLine}></div>
                    <div className={css.navLinks}>
                        {isLoggedIn ? (
                            <>
                                {/* <div>
                                    <button onClick={handleBackClick} className={css.backButton}> 
                                        <img src={btn_back} alt="Back button " />
                                    </button>
                                </div> */}
                                <MenuMobile />
                            </>
                        ) : (
                            <Navigation />
                        )}
                    </div>
                </div>
            </header>
            <div className={css.containerUserInfo}>
                {isLoggedIn && <UserInfo />}
            </div>
        </>
        
    );
};

export default Header;
