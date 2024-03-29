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

export const setResultsCount = resultsCount => ({
    type: actionType.SET_RESULTS_COUNT,
    payload: {
        resultsCount
    }
});

export const setCurrentPage = pagingCurrentPage => ({
    type: actionType.SET_CURRENT_PAGE,
    payload: {
        pagingCurrentPage
    }
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
                searchBy: store.getState().searchBy,
                filter: store.getState().filerByGenres.join(),
                search: store.getState().search,
                sortBy: store.getState().sortBy,
                sortOrder: store.getState().sortOrder,
                offset: store.getState().pagingCurrentPage * store.getState().pagingPageSize - store.getState().pagingPageSize,
                limit: store.getState().pagingPageSize,
            },
        })
            .then(response => {
                dispatch(setMovies(response.data.data));
                dispatch(setResultsCount(response.data.totalAmount));
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

export const setMovieToOverview = movieToOverview => ({
    type: actionType.SET_MOVIE_TO_OVERVIEW,
    payload: {
        movieToOverview
    }
});
