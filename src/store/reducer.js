import actionType from './actionTypes'

const initialState = {
    pending: false,
    movies: [],
    error: null,
    sortBy: 'release_date',
    sortOrder: 'desc',
    filerByGenres: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actionType.FETCH_MOVIES_PENDING:
            return {
                ...state,
                pending: true
            };
        case actionType.SET_MOVIES:
            return {
                ...state,
                pending: false,
                movies: action.payload.movies,
            };
        case actionType.FETCH_MOVIES_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            };
        case actionType.SET_SORT_BY:
            return {
                ...state,
                sortBy: action.payload.sortBy
            };
        case actionType.SET_SORT_ORDER:
            return {
                ...state,
                sortOrder: action.payload.sortOrder
            };
        case actionType.FILTER_BY_GENRES: // TODO remove?
            const genresFilter = action.payload.genres;
            let filteredMovieList = state.notFilteredMovies;
            filteredMovieList = filteredMovieList.filter((movie) => {
                return (
                    !genresFilter.length ||
                    movie.genres.some((genre) =>
                        genresFilter.includes(genre)
                    )
                );
            });
            return {
                ...state,
                movies: [...filteredMovieList],
                filerByGenres: action.payload.genres
            };
        default:
            return state;
    }
}
