import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react';
import './Header.css';
import logo from '../../../public/netflix-logo.svg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

export default function Header(props) {
    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [posterUrl, setPosterUrl] = useState('');
    const [genres, setGenres] = useState([]);
    const [overview, setOverview] = useState('');
    const [runtime, setRuntime] = useState('');

    const resetFields = () => {
        setTitle('');
        setReleaseDate('');
        setPosterUrl('');
        setGenres('');
        setOverview('');
        setRuntime('');
    };

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        resetFields;
    };
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        setShow(false);

        let movie = {
            id: Math.round(Date.now() / 1000), // put epoch time as id for now
            title: title,
            release_date: releaseDate,
            poster_path: posterUrl,
            overview: overview,
            genres: genres,
            runtime: runtime,
        };
        props.addMovie(movie);
        resetFields;
    };

    return (
        <header className='header-container'>
            <div className='logo-and-add-button-container'>
                <img src={logo} alt='logo' className='logo' />
                <button className='add-button' onClick={handleShow}>
                    ADD MOVIE
                </button>
                <Modal
                    show={show}
                    onHide={handleClose}
                    animation={null}
                    backdrop='static'
                    size='lg'
                >
                    <Modal.Header closeButton>
                        <Modal.Title>ADD MOVIE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='dialog-field-container'>
                            <span className='dialog-field-label'>Title</span>
                            <input
                                type='text'
                                placeholder='Title'
                                className='dialog-field-input'
                                // value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className='dialog-field-container'>
                            <span className='dialog-field-label'>
                                Release date
                            </span>
                            <Form.Control
                                type='date'
                                onChange={(e) => setReleaseDate(e.target.value)}
                            />
                        </div>
                        <div className='dialog-field-container'>
                            <span className='dialog-field-label'>
                                Movie Poster URL
                            </span>
                            <input
                                type='text'
                                placeholder='Movie Poster URL here'
                                className='dialog-field-input'
                                onChange={(e) => setPosterUrl(e.target.value)}
                            />
                        </div>
                        <div className='dialog-field-container'>
                            <span className='dialog-field-label'>Genres</span>
                            <input
                                type='text'
                                placeholder='Enter Genres here using <,>'
                                className='dialog-field-input'
                                onChange={(e) =>
                                    setGenres(
                                        e.target.value
                                            .replaceAll(', ', ',')
                                            .split(',')
                                    )
                                }
                            />
                        </div>
                        <div className='dialog-field-container'>
                            <span className='dialog-field-label'>Overview</span>
                            <input
                                type='text'
                                placeholder='Overview here'
                                className='dialog-field-input'
                                onChange={(e) => setOverview(e.target.value)}
                            />
                        </div>
                        <div className='dialog-field-container'>
                            <span className='dialog-field-label'>Runtime</span>
                            <input
                                type='text'
                                placeholder='Enter Runtime here'
                                className='dialog-field-input'
                                // value={runtime}
                                onChange={(e) => setRuntime(e.target.value)}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                            Reset
                        </Button>
                        <Button variant='primary' onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
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
