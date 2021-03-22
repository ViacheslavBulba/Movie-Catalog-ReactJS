import React from 'react';
import './MovieList.css';
import MovieCard from '../MovieCard/MovieCard';
import { connect } from 'react-redux';

function MovieList(props) {
    return (
        <div className='movie-list-container'>
            {props.movies.map((item) => (
                <MovieCard
                    movie={item}
                    key={item.id}
                    showOverview={props.showOverview}
                />
            ))}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
    };
};

export default connect(mapStateToProps)(MovieList);
