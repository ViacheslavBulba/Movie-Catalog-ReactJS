import React from 'react';
import './MovieDetailsModal.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { thunkedAddMovie, thunkedUpdateMovie } from '../../../store/actions';
import store from '../../../store/store';
import { MultiSelect } from 'primereact/multiselect';
import { useFormik } from 'formik';

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
        'War',
        'Romance',
        'Western',
        'Mystery',
        'Animation',
    ];

    const isEditing = props.movie ? true : false;

    const validate = (values) => {
        const errors = {};
        if (!values.title) {
            errors.title = 'Please enter a title';
        }
        if (!values.releaseDate) {
            errors.releaseDate = 'Please select a release date';
        }
        if (!values.posterUrl) {
            errors.posterUrl = 'Please enter a poster url';
        } else if (!/^(https?):\/\/[^\s$.?#].[^\s]*$/i.test(values.posterUrl)) {
            errors.posterUrl =
                'Not a valid http link, please enter a valid http link';
        }
        if (!values.overview) {
            errors.overview = 'Please enter an overview';
        }
        if (values.genres.length === 0) {
            errors.genres = 'Please select at least one genre';
        }
        if (!values.runtime) {
            errors.runtime = 'Please enter a runtime';
        } else if (!/\d+$/i.test(values.runtime)) {
            errors.runtime = 'Please enter a number';
        }
        return errors;
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: isEditing ? props.movie.title : '',
            releaseDate: isEditing ? props.movie.release_date : '',
            posterUrl: isEditing ? props.movie.poster_path : '',
            genres: isEditing ? props.movie.genres : [],
            overview: isEditing ? props.movie.overview : '',
            runtime: isEditing ? props.movie.runtime : '',
        },
        validate,
        onSubmit: (values) => {
            if (isEditing) {
                const updatedMovie = {
                    id: props.movie.id,
                    release_date: values.releaseDate,
                    poster_path: values.posterUrl,
                    title: values.title,
                    overview: values.overview,
                    genres: values.genres,
                    runtime: Number(values.runtime), // bad request if string
                    vote_average: props.movie.vote_average,
                    tagline: props.movie.tagline || 'Tag line was empty', // getting bad request for update when I receive it as empty from the backend and sending back as is empty, so putting some not empty value here
                };
                store.dispatch(thunkedUpdateMovie(updatedMovie));
            } else {
                const newMovie = {
                    release_date: values.releaseDate,
                    poster_path: values.posterUrl,
                    title: values.title,
                    overview: values.overview,
                    genres: values.genres,
                    runtime: Number(values.runtime), // bad request if string
                };
                store.dispatch(thunkedAddMovie(newMovie));
            }
            handleClose();
        },
    });

    const handleClose = () => {
        props.handleCloseModal();
        formik.resetForm();
    };

    const addRedBorderIfError = (field) => {
        return formik.touched[field] && formik.errors[field]
            ? 'red-border'
            : '';
    };

    return (
        <Modal
            show={props.show}
            onHide={handleClose}
            animation={null}
            backdrop="static"
            size="lg"
        >
            <form onSubmit={formik.handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isEditing ? 'EDIT MOVIE' : 'ADD MOVIE'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="dialog-field-container">
                        <span className="dialog-field-label">Title</span>
                        <input
                            type="text"
                            placeholder="Enter Title here"
                            className={
                                'dialog-field-input ' +
                                addRedBorderIfError('title')
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                            id="title"
                            name="title"
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <span className="error">{formik.errors.title}</span>
                        ) : null}
                    </div>
                    <div className="dialog-field-container">
                        <span className="dialog-field-label">Release date</span>
                        <Form.Control
                            type="date"
                            className={addRedBorderIfError('releaseDate')}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.releaseDate}
                            id="releaseDate"
                            name="releaseDate"
                        />
                        {formik.touched.releaseDate &&
                        formik.errors.releaseDate ? (
                            <span className="error">
                                {formik.errors.releaseDate}
                            </span>
                        ) : null}
                    </div>
                    <div className="dialog-field-container">
                        <span className="dialog-field-label">
                            Movie Poster URL
                        </span>
                        <input
                            type="text"
                            placeholder="Enter Movie Poster URL here"
                            className={
                                'dialog-field-input ' +
                                addRedBorderIfError('posterUrl')
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.posterUrl}
                            id="posterUrl"
                            name="posterUrl"
                        />
                        {formik.touched.posterUrl && formik.errors.posterUrl ? (
                            <span className="error">
                                {formik.errors.posterUrl}
                            </span>
                        ) : null}
                    </div>
                    <div className="dialog-field-container">
                        <span className="dialog-field-label">Genres</span>
                        <MultiSelect
                            className={addRedBorderIfError('genres')}
                            options={allGenres}
                            maxSelectedLabels={11}
                            placeholder="Select Genres"
                            value={formik.values.genres}
                            onChange={formik.handleChange}
                            id="genres"
                            name="genres"
                        />
                        {formik.touched.genres && formik.errors.genres ? (
                            <span className="error">
                                {formik.errors.genres}
                            </span>
                        ) : null}
                    </div>
                    <div className="dialog-field-container">
                        <span className="dialog-field-label">Overview</span>
                        <input
                            type="text"
                            placeholder="Enter Overview here"
                            className={
                                'dialog-field-input ' +
                                addRedBorderIfError('overview')
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.overview}
                            id="overview"
                            name="overview"
                        />
                        {formik.touched.overview && formik.errors.overview ? (
                            <span className="error">
                                {formik.errors.overview}
                            </span>
                        ) : null}
                    </div>
                    <div className="dialog-field-container">
                        <span className="dialog-field-label">Runtime</span>
                        <input
                            type="text"
                            placeholder="Enter Runtime here"
                            className={
                                'dialog-field-input ' +
                                addRedBorderIfError('runtime')
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.runtime}
                            id="runtime"
                            name="runtime"
                        />
                        {formik.touched.runtime && formik.errors.runtime ? (
                            <span className="error">
                                {formik.errors.runtime}
                            </span>
                        ) : null}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={formik.handleReset}
                        type="button"
                    >
                        Reset
                    </Button>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </form>
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
        vote_average: PropTypes.number,
        tagline: PropTypes.string,
    }),
};
