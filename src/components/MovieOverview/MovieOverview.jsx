import React from 'react';
import './MovieOverview.css';
import Moment from 'react-moment';
import logo from '../../../public/netflix-logo.svg';
import noPicture from '../../../public/no-picture-available.jpg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function MovieOverview() {
    const addDefaultSrc = (e) => {
        e.target.src = noPicture;
    };

    const movie = useSelector((state) => state.movieToOverview);

    return (
        <>
            {movie === null ? (
                <span>Loading...</span>
            ) : (
                <div className='overview-container'>
                    <div className='logo-and-back-button-container'>
                        <img src={logo} alt='logo' className='logo' />
                        <Link to='/'>
                            <i className='fa fa-times search-icon'></i>
                        </Link>
                    </div>
                    <div className='movie-details-container'>
                        <img
                            className='movie-image-overview'
                            src={movie.poster_path || noPicture}
                            onError={addDefaultSrc}
                        ></img>
                        <div className='overview-text-container'>
                            <div className='name-and-rating-container'>
                                <span className='overview-title'>
                                    {movie.title}
                                </span>
                                <span className='overview-rating'>
                                    {movie.vote_average}
                                </span>
                            </div>
                            <span className='overview-tagline'>
                                {movie.tagline}
                            </span>
                            <div className='year-and-duration-container'>
                                <Moment
                                    date={movie.release_date}
                                    parse='YYYY-MM-dd'
                                    format='YYYY'
                                    className='overview-year'
                                />
                                <span>{movie.runtime} min</span>
                            </div>
                            <span className='overview-text'>
                                {movie.overview}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
