import React, { useState } from 'react';
import './MovieCard.css';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

export default function MovieCard(props) {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <>
            <div
                className='movie-card-container'
                onMouseOver={() => setIsHovering(true)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {isHovering && (
                    <div className='edit-delete-icons-container'>
                        <i
                            className='fa fa-trash'
                            onClick={() => props.deleteMovie(props.movie.id)}
                        />
                    </div>
                )}
                <img
                    className='movie-image'
                    src={props.movie.poster_path}
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
    deleteMovie: PropTypes.func.isRequired,
};
