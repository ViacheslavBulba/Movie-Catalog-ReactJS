import React, { useState } from 'react';
import './MovieDetailsModal.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import noPicture from '../../../../public/no-picture-available.jpg';
import { thunkedAddMovie, thunkedUpdateMovie } from '../../../store/actions';
import store from '../../../store/store';
import { MultiSelect } from 'primereact/multiselect';

export default function MovieDetailsModal(props) {
    const allGenres = [
        'Fantasy',
        'Drama',
        'Action',
        'Comedy',
        'Crime',
        'Science Fiction',
        'Adventure',
        'Thriller',
        'Family',
        'Documentary',
        'Horror',
    ];

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
    const [runtime, setRuntime] = useState(
        isEditing && props.movie.runtime !== null ? props.movie.runtime : 0
    );

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
            tagline: props.movie.tagline || 'Tag line was empty', // getting bad request for update when I receive it as empty from the backend and sending back as is empty, so putting some not empty value here
        };
        store.dispatch(thunkedUpdateMovie(movie));
    };

    const handleAdd = () => {
        const movieToAdd = {
            release_date: releaseDate || '2021-03-21',
            poster_path: posterUrl || noPicture,
            title: title || 'Some new title',
            overview: overview || 'Some new overview',
            genres: genres.length === 0 ? ['Drama'] : genres,
            runtime: runtime || 99,
            vote_average: 0.0,
            tagline: 'New movie',
        };
        store.dispatch(thunkedAddMovie(movieToAdd));
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
                    <MultiSelect
                        value={genres}
                        options={allGenres}
                        maxSelectedLabels={11}
                        onChange={(e) => setGenres(e.value)}
                        placeholder='Select Genres'
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

MovieDetailsModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    movie: PropTypes.shape({
        id: PropTypes.number,
        poster_path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        release_date: PropTypes.string.isRequired,
        genres: PropTypes.arrayOf(PropTypes.string.isRequired),
        overview: PropTypes.string.isRequired,
        runtime: PropTypes.number,
        vote_average: PropTypes.number.isRequired,
        tagline: PropTypes.string.isRequired,
    }),
};
