import actionType from './actionTypes'

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

export const fetchMoviesSuccess = movies => ({
    type: actionType.FETCH_MOVIES_SUCCESS,
    payload: {
        movies
    }
});

export const fetchMoviesError = error => ({
    type: actionType.FETCH_MOVIES_ERROR,
    payload: {
        error
    }
})

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
