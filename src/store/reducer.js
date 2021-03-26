import actionType from './actionTypes'

const initialState = {
    pending: false,
    notFilteredMovies: [],
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
        case actionType.FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                pending: false,
                movies: action.payload.movies, //TODO add sorting
                notFilteredMovies: action.payload.movies
            };
        case actionType.FETCH_MOVIES_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            };
        case actionType.ADD_MOVIE:
            return {
                ...state,
                movies: [action.payload.movie, ...state.movies],  //TODO add sorting
                notFilteredMovies: [action.payload.movie, ...state.notFilteredMovies]
            };
        case actionType.DELETE_MOVIE:
            return {
                ...state,
                movies: state.movies.filter(movie => movie.id !== action.payload.id),
                notFilteredMovies: state.notFilteredMovies.filter(movie => movie.id !== action.payload.id)
            };
        case actionType.UPDATE_MOVIE:
            const movie = action.payload.movie;
            let updatedMovieList = state.movies;
            const movieIndex = updatedMovieList.findIndex((x) => x.id === movie.id);
            updatedMovieList[movieIndex] = movie;
            let updatedNotFilteredMovieList = state.notFilteredMovies;
            const notFilteredMovieIndex = updatedNotFilteredMovieList.findIndex((x) => x.id === movie.id);
            updatedNotFilteredMovieList[notFilteredMovieIndex] = movie;
            return {
                ...state,
                movies: [...updatedMovieList], //TODO add sorting
                notFilteredMovies: [...updatedNotFilteredMovieList]
            };
        case actionType.SORT_MOVIES:
            const sortBy = action.payload.sortBy;
            let sortedMovieList = state.movies;
            sortedMovieList.sort((a, b) => {
                return sortBy === 'release_date'
                    ? Date.parse(b.release_date) -
                    Date.parse(a.release_date)
                    : a.title.localeCompare(b.title);
            })
            return {
                ...state,
                movies: [...sortedMovieList],
                sortBy: action.payload.sortBy
            };
        case actionType.SET_SORT_BY:
            return {
                ...state,
                sortBy: action.payload.sortBy
            };
        case actionType.FILTER_BY_GENRES:
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

export const getSortBy = state => state.sortBy;
export const getSortOrder = state => state.sortOrder;
