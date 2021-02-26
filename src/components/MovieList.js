
import React from 'react';
import '../css/MovieList.css';
import MovieCard from './MovieCard';

export default function MovieList(props) {

    return (
        <div className="movie-list-container">
            {props.movies.map(item => (
                <MovieCard movie={item} key={item.id} />
            ))}
        </div>
    )
}
