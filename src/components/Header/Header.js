import React from 'react';
import './Header.css';
import logo from '../../../public/netflix-logo.svg';

export default function Header() {

    return (
        <header className="header-container">
            <div className="logo-and-add-button-container">
                <img
                    src={logo}
                    alt="logo"
                    className="logo"
                />
                <button className="add-button">ADD MOVIE</button>
            </div>
            <div className="header-text">FIND YOUR MOVIE</div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="What do you want to watch?"
                    className="search-input"
                />
                <button className="search-button">SEARCH</button>
            </div>
        </header>
    );
}
