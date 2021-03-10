import React, { useState } from 'react';
import './Header.css';
import logo from '../../../public/netflix-logo.svg';
import PropTypes from 'prop-types';
import MovieDetailsModal from '../shared/MovieDetailsModal/MovieDetailsModal';

export default function Header(props) {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const showAddMovieModal = () => setShowModal(true);

    return (
        <header className='header-container'>
            <div className='logo-and-add-button-container'>
                <img src={logo} alt='logo' className='logo' />
                <button className='add-button' onClick={showAddMovieModal}>
                    ADD MOVIE
                </button>
                <MovieDetailsModal
                    show={showModal}
                    handleCloseModal={handleCloseModal}
                    addMovie={props.addMovie}
                />
            </div>
            <div className='header-text'>FIND YOUR MOVIE</div>
            <div className='search-container'>
                <input
                    type='text'
                    placeholder='What do you want to watch?'
                    className='search-input'
                />
                <button className='search-button'>SEARCH</button>
            </div>
        </header>
    );
}

Header.propTypes = {
    addMovie: PropTypes.func.isRequired,
};
