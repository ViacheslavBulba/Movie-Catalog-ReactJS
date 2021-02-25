import React from 'react';
import '../css/MovieCard.css';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

export default function MovieCard(props) {

    return (
        <>
            <div className="movie-card-container">
                <img className="movie-image" src={props.movie.poster_path}></img>
                <div className="name-and-year-container">
                    <div>{props.movie.title}</div>
                    <Moment
                        date={props.movie.release_date}
                        parse="YYYY-MM-dd"
                        format="YYYY"
                        className="year"
                    />
                </div>
                <div className="genres">{props.movie.genres.join(", ")}</div>
            </div>
        </>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        poster_path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        release_date: PropTypes.string.isRequired,
        genres: PropTypes.arrayOf(PropTypes.string.isRequired)
    }).isRequired,
}
