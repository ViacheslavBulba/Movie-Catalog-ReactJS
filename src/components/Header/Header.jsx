import './Header.css';

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../../../public/netflix-logo.svg';
import { setSearch, setSearchBy, thunkedSetMovies } from '../../store/actions';
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
    store.dispatch(thunkedSetMovies());
    if (searchValue === '') {
      history.push('/');
    } else {
      history.push(`/search/${searchValue}`);
    }
  };

  const doSearchIfEnterKeyPressed = (e) => {
    if (e.which === 13) {
      handleSearch();
    }
  };

  const onSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <header className="header-container">
      <div className="logo-and-add-button-container">
        <img src={logo} alt="logo" className="logo" />
        <button className="add-button" onClick={showAddMovieModal} type="button">
          ADD MOVIE
        </button>
        <MovieDetailsModal
          show={showModal}
          handleCloseModal={handleCloseModal}
        />
      </div>
      <div className="header-text">FIND YOUR MOVIE</div>
      <div className="search-container">
        <input
          type="text"
          placeholder="What do you want to watch?"
          className="search-input"
          value={searchValue}
          onChange={onSearchValueChange}
          onKeyPress={doSearchIfEnterKeyPressed}
        />
        <button className="search-button" onClick={handleSearch} type="button">
          SEARCH
        </button>
      </div>
    </header>
  );
}
