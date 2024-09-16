import React from "react";
import css from './Logo.module.css';
import { NavLink } from "react-router-dom";
import logoMob_1 from '../../svg/responsive_pic/logo_mobile@1x.png';
import logoMob_2 from '../../svg/responsive_pic/logo_mobile@2x.png';
import logoTab_1 from '../../svg/responsive_pic/logo_tablet@1x.png';
import logoTab_2 from '../../svg/responsive_pic/logo_tablet@2x.png';
import logoDesktop_1 from '../../svg/responsive_pic/logo_desktop@1x.png';
import logoDesktop_2 from '../../svg/responsive_pic/logo_desktop@2x.png';

const Logo = () => {
    return (
        <NavLink to='/'>
            <picture>
                <source
                    srcSet={`${logoMob_1} 1x, ${logoMob_2} 2x`}
                    media="(max-width: 767px)"
                />
                
                <source
                    srcSet={`${logoTab_1} 1x, ${logoTab_2} 2x`}
                    media="(min-width: 768px) and (max-width: 1023px)"
                />
                
                <source
                    srcSet={`${logoDesktop_1} 1x, ${logoDesktop_2} 2x`}
                    media="(min-width: 1024px)"
                />
                
                <img
                    src={logoDesktop_1}
                    alt="Logo"
                    className={css.responsiveImg}
                />
            </picture>
        </NavLink>
    );
};

export default Logo;
