import React from 'react';
import './MovieList.css';
import MovieCard from '../MovieCard/MovieCard';
import { useSelector } from 'react-redux';

export default function MovieList() {
    const movies = useSelector((state) => state.movies);

    return (
        <div className='movie-list-container'>
            {movies.length === 0 ? (
                <span className='no-movies-text'>No Movies Found</span>
            ) : (
                movies.map((item) => <MovieCard movie={item} key={item.id} />)
            )}
        </div>
    );
}
