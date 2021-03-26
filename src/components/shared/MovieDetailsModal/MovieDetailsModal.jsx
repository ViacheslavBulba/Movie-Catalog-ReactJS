import React, { useState } from 'react';
import './MovieDetailsModal.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import noPicture from '../../../../public/no-picture-available.jpg';

import { connect } from 'react-redux';
import { addMovie, updateMovie } from '../../../store/actions';
import store from '../../../store/store';
import config from 'config';

function MovieDetailsModal(props) {
    const isEditing = props.movie ? true : false;

    const [title, setTitle] = useState(isEditing ? props.movie.title : '');
    const [releaseDate, setReleaseDate] = useState(
        isEditing ? props.movie.release_date : ''
    );
    const [posterUrl, setPosterUrl] = useState(
        isEditing ? props.movie.poster_path : ''
    );
    const [genres, setGenres] = useState(isEditing ? props.movie.genres : []);
    const [overview, setOverview] = useState(
        isEditing ? props.movie.overview : ''
    );
    const [runtime, setRuntime] = useState(isEditing ? props.movie.runtime : 0);

    const resetFieldsOnSubmit = () => {
        setTitle(isEditing ? title : '');
        setReleaseDate(isEditing ? releaseDate : '');
        setPosterUrl(isEditing ? posterUrl : '');
        setGenres(isEditing ? genres : []);
        setOverview(isEditing ? overview : '');
        setRuntime(isEditing ? runtime : '');
    };

    const resetFieldsOnCancel = () => {
        setTitle(isEditing ? props.movie.title : '');
        setReleaseDate(isEditing ? props.movie.release_date : '');
        setPosterUrl(isEditing ? props.movie.poster_path : '');
        setGenres(isEditing ? props.movie.genres : []);
        setOverview(isEditing ? props.movie.overview : '');
        setRuntime(isEditing ? props.movie.runtime : '');
    };

    const handleClose = () => {
        props.handleCloseModal();
        resetFieldsOnCancel();
    };

    const handleUpdate = () => {
        const movie = {
            id: props.movie.id,
            release_date: releaseDate,
            poster_path: posterUrl,
            title,
            overview,
            genres,
            runtime,
            vote_average: props.movie.vote_average,
            tagline: props.movie.tagline,
        };
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movie),
        };
        fetch(`${config.apiUrl}/movies/`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                store.dispatch(updateMovie(data));
            });
    };

    const handleAdd = () => {
        const movieToAdd = {
            release_date: releaseDate || '2021-03-21',
            poster_path: posterUrl || noPicture,
            title: title || 'Some new title',
            overview: overview || 'Some new overview',
            genres: ['Drama'], // TODO add genres from form
            runtime: runtime || 99,
            vote_average: 0.0,
            tagline: 'New movie',
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movieToAdd),
        };
        fetch(`${config.apiUrl}/movies/`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                store.dispatch(addMovie(data));
            });
    };

    const handleSubmit = () => {
        if (isEditing) {
            handleUpdate();
        } else {
            handleAdd();
        }
        props.handleCloseModal();
        resetFieldsOnSubmit();
    };

    return (
        <Modal
            show={props.show}
            onHide={handleClose}
            animation={null}
            backdrop='static'
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {isEditing ? 'EDIT MOVIE' : 'ADD MOVIE'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='dialog-field-container'>
                    <span className='dialog-field-label'>Title</span>
                    <input
                        type='text'
                        placeholder='Enter Title here'
                        className='dialog-field-input'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='dialog-field-container'>
                    <span className='dialog-field-label'>Release date</span>
                    <Form.Control
                        type='date'
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                    />
                </div>
                <div className='dialog-field-container'>
                    <span className='dialog-field-label'>Movie Poster URL</span>
                    <input
                        type='text'
                        placeholder='Enter Movie Poster URL here'
                        className='dialog-field-input'
                        value={posterUrl}
                        onChange={(e) => setPosterUrl(e.target.value)}
                    />
                </div>
                <div className='dialog-field-container'>
                    <span className='dialog-field-label'>Genres</span>
                    <input
                        type='text'
                        placeholder='Enter Genres here using <,>'
                        className='dialog-field-input'
                        value={genres}
                        onChange={(e) =>
                            setGenres(
                                e.target.value.replaceAll(', ', ',').split(',')
                            )
                        }
                    />
                </div>
                <div className='dialog-field-container'>
                    <span className='dialog-field-label'>Overview</span>
                    <input
                        type='text'
                        placeholder='Enter Overview here'
                        className='dialog-field-input'
                        value={overview}
                        onChange={(e) => setOverview(e.target.value)}
                    />
                </div>
                <div className='dialog-field-container'>
                    <span className='dialog-field-label'>Runtime</span>
                    <input
                        type='text'
                        placeholder='Enter Runtime here'
                        className='dialog-field-input'
                        value={runtime}
                        onChange={(e) => setRuntime(e.target.value)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Close
                </Button>
                <Button variant='primary' onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default connect(null, { addMovie, updateMovie })(MovieDetailsModal);

MovieDetailsModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    addMovie: PropTypes.func,
    updateMovie: PropTypes.func,
    movie: PropTypes.shape({
        id: PropTypes.number,
        poster_path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        release_date: PropTypes.string.isRequired,
        genres: PropTypes.arrayOf(PropTypes.string.isRequired),
        overview: PropTypes.string.isRequired,
        runtime: PropTypes.number.isRequired,
        vote_average: PropTypes.number.isRequired,
        tagline: PropTypes.string.isRequired,
    }),
};
