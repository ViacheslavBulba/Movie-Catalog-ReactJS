import React from 'react';
import './MovieList.css';
import MovieCard from '../MovieCard/MovieCard';
import PropTypes from 'prop-types';
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

MovieList.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            poster_path: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            release_date: PropTypes.string.isRequired,
            genres: PropTypes.arrayOf(PropTypes.string.isRequired),
        }).isRequired
    ).isRequired,
    showOverview: PropTypes.func.isRequired,
};
