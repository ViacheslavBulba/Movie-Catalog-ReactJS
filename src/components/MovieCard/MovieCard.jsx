import './MovieCard.css';

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import noPicture from '../../../public/no-picture-available.jpg';
import { thunkedDeleteMovie } from '../../store/actions';

import MovieDetailsModal from '../shared/MovieDetailsModal/MovieDetailsModal';

import { useDispatch, useStore } from 'react-redux';

export default function MovieCard(props) {
    const dispatch = useDispatch();

    const store = useStore();

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const showEditMovieModal = () => setShowModal(true);

    const handleDelete = (id) => {
        dispatch(thunkedDeleteMovie(id, store));
    };

    const addDefaultSrc = (e) => {
        e.target.src = noPicture;
    };

    return (
        <>
            <div className='movie-card-container'>
                <div className='edit-delete-icons-container'>
                    <i className='fa fa-edit' onClick={showEditMovieModal} />
                    <i
                        className='fa fa-trash'
                        onClick={() => handleDelete(props.movie.id)}
                    />
                </div>
                <Link to={`/film/${props.movie.id}`}>
                    <img
                        className='movie-image'
                        src={
                            props.movie.poster_path === ''
                                ? noPicture
                                : props.movie.poster_path
                        }
                        onError={addDefaultSrc}
                    ></img>
                </Link>
                <div className='name-and-year-container'>
                    <div>{props.movie.title}</div>
                    <Moment
                        date={props.movie.release_date}
                        parse='YYYY-MM-dd'
                        format='YYYY'
                        className='year'
                    />
                </div>
                <div className='genres'>{props.movie.genres.join(', ')}</div>
            </div>
            <MovieDetailsModal
                show={showModal}
                handleCloseModal={handleCloseModal}
                movie={props.movie}
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
