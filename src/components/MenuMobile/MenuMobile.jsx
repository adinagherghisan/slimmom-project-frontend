import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import css from './MenuMobile.module.css';
import menu from '../../svg/menuMobile.png';

const MenuMobile = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleLinkClick = (path) => {
        navigate(path); 
        setIsMenuOpen(false); 
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <button type="button" className={css.menuButton} onClick={toggleMenu}>
                <img src={menu} alt="Mobile menu" />
            </button>
            {isMenuOpen && (
                <nav ref={menuRef} className={`${css.nav} ${isMenuOpen ? css.open : ''}`}>
                    <ul className={css.list}>
                        <li className={css.link}>
                            <button onClick={() => handleLinkClick('/diary')} className={css.navLink}>
                                Diary
                            </button>
                        </li>
                        <li className={css.link}>
                            <button onClick={() => handleLinkClick('/calculator')} className={css.navLink}>
                                Calculator
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
};

export default MenuMobile;
