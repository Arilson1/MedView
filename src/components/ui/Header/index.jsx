import { useState, useEffect } from 'react';
import { Stethoscope } from "@phosphor-icons/react";

import styles from './header.module.css';
import { Button } from '../Button';


export function Header() {

    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);


    function toggleTheme() {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    }

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Stethoscope size={22} /> <span>MedView</span>
            </div>
            <div className={styles.navigationContainer}>
                <Button onClick={() => alert('Clique!')}>Login</Button>
                <button
                    className={styles.btnDarkMode}
                    onClick={toggleTheme}
                    title='Tema'
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
        </header>
    )
}