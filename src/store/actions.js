import actionType from './actionTypes'
import config from 'config';
import axios from 'axios';
import store from './store';

export const thunkedAddMovie = movie =>
    dispatch =>
        axios.post(`${config.apiUrl}/movies/`, movie)
            .then(() => {
                dispatch(thunkedFetchMoviesSuccessWithoutParameters());
            });

export const thunkedDeleteMovie = id =>
    dispatch =>
        axios.delete(`${config.apiUrl}/movies/${id}`)
            .then(() => {
                dispatch(thunkedFetchMoviesSuccessWithoutParameters());
            });

export const thunkedUpdateMovie = movie =>
    dispatch =>
        axios.put(`${config.apiUrl}/movies/`, movie)
            // .then((response) => {
            //     console.log(response);
            // })
            .then(() => {
                dispatch(thunkedFetchMoviesSuccessWithoutParameters());
            });

export const fetchMoviesPending = () => ({
    type: actionType.FETCH_MOVIES_PENDING
});

export const setMovies = movies => ({
    type: actionType.SET_MOVIES,
    payload: {
        movies
    }
});

export const thunkedFetchMoviesSuccessWithoutParameters = () =>
    dispatch =>
        axios.get(`${config.apiUrl}/movies?sortBy=${store.getState().sortBy}&sortOrder=${store.getState().sortOrder}`)
            .then(response => {
                console.log(response);
                dispatch(setMovies(response.data.data))
            })
            .catch(error => {
                dispatch(fetchMoviesError(error));
            });

export const fetchMoviesError = error => ({
    type: actionType.FETCH_MOVIES_ERROR,
    payload: {
        error
    }
});

export const setSortBy = sortBy => ({
    type: actionType.SET_SORT_BY,
    payload: {
        sortBy
    }
});

export const setSortOrder = sortOrder => ({
    type: actionType.SET_SORT_ORDER,
    payload: {
        sortOrder
    }
});

export const filterByGenres = genres => ({
    type: actionType.FILTER_BY_GENRES,
    payload: {
        genres
    }
});
