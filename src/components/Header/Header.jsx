import './Header.css';

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../../../public/netflix-logo.svg';
import { setSearch, setSearchBy, thunkedSetMovies } from '../../store/actions';
import { useStore, useDispatch } from 'react-redux';
import MovieDetailsModal from '../shared/MovieDetailsModal/MovieDetailsModal';

export default function Header() {
    const dispatch = useDispatch();

    const history = useHistory();

    const [showModal, setShowModal] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const showAddMovieModal = () => setShowModal(true);

    const store = useStore();

    const handleSearch = () => {
        dispatch(setSearch(searchValue));
        dispatch(setSearchBy('title')); // re-setting it to 'title' here in case it is changed by other component
        dispatch(thunkedSetMovies(store));
        searchValue === ''
            ? history.push('/')
            : history.push('/search/' + searchValue);
    };

    const doSearchIfEnterKeyPressed = (e) => {
        if (e.which === 13) {
            handleSearch();
        }
    };

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
                />
            </div>
            <div className='header-text'>FIND YOUR MOVIE</div>
            <div className='search-container'>
                <input
                    type='text'
                    placeholder='What do you want to watch?'
                    className='search-input'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={doSearchIfEnterKeyPressed}
                />
                <button className='search-button' onClick={handleSearch}>
                    SEARCH
                </button>
            </div>
        </header>
    );
}
