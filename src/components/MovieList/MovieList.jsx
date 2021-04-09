import React from 'react';
import './MovieList.css';
import MovieCard from '../MovieCard/MovieCard';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function MovieList(props) {
    const movies = useSelector((state) => state.movies);

    return (
        <div className='movie-list-container'>
            {movies.length === 0 ? (
                <span className='no-movies-text'>No Movies Found</span>
            ) : (
                movies.map((item) => (
                    <MovieCard
                        movie={item}
                        key={item.id}
                        showOverview={props.showOverview}
                    />
                ))
            )}
        </div>
    );
}

MovieList.propTypes = {
    showOverview: PropTypes.func.isRequired,
};
