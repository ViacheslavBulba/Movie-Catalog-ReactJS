import actionType from './actionTypes'
import config from 'config';
import axios from 'axios';

export const addMovie = movie => ({
    type: actionType.ADD_MOVIE,
    payload: {
        movie
    }
});

export const deleteMovie = id => ({
    type: actionType.DELETE_MOVIE,
    payload: {
        id
    }
});

export const updateMovie = movie => ({
    type: actionType.UPDATE_MOVIE,
    payload: {
        movie
    }
});

export const fetchMoviesPending = () => ({
    type: actionType.FETCH_MOVIES_PENDING
});

export const setMovies = movies => ({
    type: actionType.FETCH_MOVIES_SUCCESS,
    payload: {
        movies
    }
});

export const thunkedFetchMoviesSuccess = () =>
    dispatch =>
        axios.get(`${config.apiUrl}/movies`)
            .then(res => res.data)
            .then(res => {
                if (res.error) {
                    throw res.error;
                }
                dispatch(setMovies(res.data))
            })
            .catch((error) => {
                dispatch(fetchMoviesError(error));
            });

export const fetchMoviesError = error => ({
    type: actionType.FETCH_MOVIES_ERROR,
    payload: {
        error
    }
});

export const sortMovies = sortBy => ({
    type: actionType.SORT_MOVIES,
    payload: {
        sortBy
    }
});

export const filterByGenres = genres => ({
    type: actionType.FILTER_BY_GENRES,
    payload: {
        genres
    }
});
