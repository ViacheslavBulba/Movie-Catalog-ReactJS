import actionType from './actionTypes';
import config from 'config';
import axios from 'axios';
import store from './store';

export const thunkedAddMovie = movie =>
    dispatch =>
        axios.post(`${config.apiUrl}/movies/`, movie)
            .then(() => {
                dispatch(thunkedSetMovies());
            });

export const thunkedDeleteMovie = id =>
    dispatch =>
        axios.delete(`${config.apiUrl}/movies/${id}`)
            .then(() => {
                dispatch(thunkedSetMovies());
            });

export const thunkedUpdateMovie = movie =>
    dispatch =>
        axios.put(`${config.apiUrl}/movies/`, movie)
            .then(() => {
                dispatch(thunkedSetMovies());
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

export const thunkedSetMovies = () =>
    dispatch =>
        axios.get(`${config.apiUrl}/movies`, {
            params: {
                sortBy: store.getState().sortBy,
                sortOrder: store.getState().sortOrder,
                filter: store.getState().filerByGenres.join('%2C'),
                searchBy: store.getState().searchBy,
                search: store.getState().search,
            },
        })
            .then(response => {
                // console.log(response); // left commented for debug purpose
                dispatch(setMovies(response.data.data));
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

export const setFilterByGenres = genres => ({
    type: actionType.SET_FILTER_BY_GENRES,
    payload: {
        genres
    }
});

export const setSearch = search => ({
    type: actionType.SET_SEARCH,
    payload: {
        search
    }
});

export const setSearchBy = searchBy => ({
    type: actionType.SET_SEARCH_BY,
    payload: {
        searchBy
    }
});
