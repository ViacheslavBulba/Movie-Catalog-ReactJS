import React from 'react';
import '../css/Footer.css';
import logo from '../../public/netflix-logo.svg';

export default function Footer() {

    return (
        <footer className="footer-container">
            <img
                src={logo}
                alt="footer logo"
                className="footer-logo"
            />
        </footer>
    )
}
