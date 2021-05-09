import './MovieCard.css';

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import noPicture from '../../../public/no-picture-available.jpg';
import { thunkedDeleteMovie } from '../../store/actions';
import store from '../../store/store';
import MovieDetailsModal from '../shared/MovieDetailsModal/MovieDetailsModal';

export default function MovieCard(props) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const showEditMovieModal = () => setShowModal(true);

  const handleDelete = (id) => {
    store.dispatch(thunkedDeleteMovie(id));
  };

  const addDefaultSrc = (e) => {
    e.target.src = noPicture;
  };

  const { movie } = props;

  return (
    <>
      <div className="movie-card-container">
        <div className="edit-delete-icons-container">
          <button onClick={showEditMovieModal} type="button" aria-label="edit"><i className="fa fa-edit" /></button>
          <button onClick={() => handleDelete(movie.id)} type="button" aria-label="delete"><i className="fa fa-trash" /></button>
        </div>
        <Link to={`/film/${movie.id}`}>
          <img
            className="movie-image"
            src={
              movie.poster_path === ''
                ? noPicture
                : movie.poster_path
            }
            onError={addDefaultSrc}
            alt="poster"
          />
        </Link>
        <div className="name-and-year-container">
          <div>{movie.title}</div>
          <Moment
            date={movie.release_date}
            parse="YYYY-MM-dd"
            format="YYYY"
            className="year"
          />
        </div>
        <div className="genres">{movie.genres.join(', ')}</div>
      </div>
      <MovieDetailsModal
        show={showModal}
        handleCloseModal={handleCloseModal}
        movie={movie}
      />
    </>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};
