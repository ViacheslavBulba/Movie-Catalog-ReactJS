import React from 'react';
import './MovieOverview.css';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import logo from '../../../public/netflix-logo.svg';
import noPicture from '../../../public/no-picture-available.jpg';

export default function MovieOverview(props) {
    return (
        <>
            <div className='overview-container'>
                <div className='logo-and-back-button-container'>
                    <img src={logo} alt='logo' className='logo' />
                    <i
                        className='fa fa-times search-icon'
                        onClick={props.closeOverview}
                    ></i>
                </div>
                <div className='movie-details-container'>
                    <img
                        className='movie-image-overview'
                        src={props.movie.poster_path || noPicture}
                    ></img>
                    <div className='overview-text-container'>
                        <div className='name-and-rating-container'>
                            <span className='overview-title'>
                                {props.movie.title}
                            </span>
                            <span className='overview-rating'>
                                {props.movie.vote_average}
                            </span>
                        </div>
                        <span className='overview-tagline'>
                            {props.movie.tagline}
                        </span>
                        <div className='year-and-duration-container'>
                            <Moment
                                date={props.movie.release_date}
                                parse='YYYY-MM-dd'
                                format='YYYY'
                                className='overview-year'
                            />
                            <span>{props.movie.runtime} min</span>
                        </div>
                        <span className='overview-text'>
                            {props.movie.overview}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

MovieOverview.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        poster_path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        release_date: PropTypes.string.isRequired,
        genres: PropTypes.arrayOf(PropTypes.string.isRequired),
        vote_average: PropTypes.number.isRequired,
        tagline: PropTypes.string.isRequired,
        runtime: PropTypes.number.isRequired,
        overview: PropTypes.string.isRequired,
    }).isRequired,
    closeOverview: PropTypes.func.isRequired,
};
