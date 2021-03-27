import actionType from './actionTypes'
import config from 'config';
import axios from 'axios';
import { getSortBy, getSortOrder } from './reducer'

export const addMovie = movie => ({
    type: actionType.ADD_MOVIE,
    payload: {
        movie
    }
});

export const thunkedAddMovie = movie =>
    dispatch =>
        axios.post(`${config.apiUrl}/movies/`, movie)
            .then((response) => {
                dispatch(addMovie(response.data));
            });

export const deleteMovie = id => ({
    type: actionType.DELETE_MOVIE,
    payload: {
        id
    }
});

export const thunkedDeleteMovie = id =>
    dispatch =>
        axios.delete(`${config.apiUrl}/movies/${id}`).then(() => {
            dispatch(deleteMovie(id));
        });

export const updateMovie = movie => ({
    type: actionType.UPDATE_MOVIE,
    payload: {
        movie
    }
});

export const thunkedUpdateMovie = movie =>
    dispatch =>
        axios.put(`${config.apiUrl}/movies/`, movie)
            .then((response) => {
                console.log(response);
            })
            .then(() => {
                dispatch(updateMovie(movie));
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
        axios.get(`${config.apiUrl}/movies?sortBy=${getSortBy}&sortOrder=${getSortOrder}`)
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

export const setSortBy = sortBy => dispatch => {
    return dispatch({
        type: actionType.SET_SORT_BY,
        payload: {
            sortBy
        }
    });
};

export const setOrderBy = orderBy => dispatch => {
    return dispatch({
        type: actionType.SET_ORDER_BY,
        payload: {
            orderBy
        }
    });
};

export const filterByGenres = genres => ({
    type: actionType.FILTER_BY_GENRES,
    payload: {
        genres
    }
});
