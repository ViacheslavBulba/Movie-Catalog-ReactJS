import React, { useState } from 'react';
import './MovieCard.css';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import MovieDetailsModal from '../shared/MovieDetailsModal/MovieDetailsModal';
import noPicture from '../../../public/no-picture-available.jpg';

import { deleteMovie } from '../../store/actions';
import store from '../../store/store';

export default function MovieCard(props) {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const showEditMovieModal = () => setShowModal(true);

    const handleDelete = (id) => {
        fetch('http://localhost:4000/movies/' + id, {
            method: 'DELETE',
        }).then(() => {
            store.dispatch(deleteMovie(id));
        });
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
                <img
                    className='movie-image'
                    src={
                        props.movie.poster_path === ''
                            ? noPicture
                            : props.movie.poster_path
                    }
                    onClick={() => props.showOverview(props.movie)}
                ></img>
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
