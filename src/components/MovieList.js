
import React from 'react';
import '../css/MovieList.css';
import MovieCard from './MovieCard';

export default function MovieList({ listInput }) {

    return (
        <div className="movie-list-container">
            {listInput.map(item => (
                <MovieCard movie={item} key={item.id} />
            ))}
        </div>
    )
}
