import './Header.css';

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../../../public/netflix-logo.svg';
import { setCurrentPage, setSearch, setSearchBy, thunkedSetMovies } from '../../store/actions';
import store from '../../store/store';
import MovieDetailsModal from '../shared/MovieDetailsModal/MovieDetailsModal';

export default function Header() {
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const showAddMovieModal = () => setShowModal(true);

    const handleSearch = () => {
        store.dispatch(setSearch(searchValue));
        store.dispatch(setSearchBy('title')); // re-setting it to 'title' here in case it is changed by other component
        store.dispatch(setCurrentPage(1));
        store.dispatch(thunkedSetMovies());
        searchValue === ''
            ? history.push('/')
            : history.push('/search/' + searchValue);
    };

    const resetSearch = () => {
        setSearchValue('')
        store.dispatch(setSearch(''));
        store.dispatch(setCurrentPage(1));
        store.dispatch(thunkedSetMovies());
        history.push('/')
    };

    const doSearchIfEnterKeyPressed = (e) => {
        if (e.which === 13) {
            handleSearch();
        }
    };

    return (
        <header className='header-container'>

            <div className='logo-container'>
                <img src={logo} alt='logo' className='logo' onClick={resetSearch}/>
            </div>

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

            <button className='reset-search-button' onClick={resetSearch}>
                RESET SEARCH
            </button>

            <button className='add-button' onClick={showAddMovieModal}>
                ADD MOVIE
            </button>
            <MovieDetailsModal
                show={showModal}
                handleCloseModal={handleCloseModal}
            />

        </header>
    );
}
