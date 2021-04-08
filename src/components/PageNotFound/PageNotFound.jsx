import React from 'react';
import './PageNotFound.css';
import logo from '../../../public/netflix-logo.svg';
import notFoundSvg from '../../../public/404-error.svg';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
    return (
        <>
            <div className='page-not-found-container'>
                <div className='logo-page-not-found-container'>
                    <img src={logo} alt='logo' className='logo' />
                </div>
                <span className='page-not-found-text'>Page Not Found</span>
                <img
                    src={notFoundSvg}
                    alt='not found image'
                    className='not-found-image'
                />
                <Link to='/'>
                    <button className='go-back-button'>GO BACK TO HOME</button>
                </Link>
            </div>
            <Footer />
        </>
    );
}
