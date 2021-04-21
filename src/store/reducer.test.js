import reducer from './reducer';
import actionType from './actionTypes';

describe('reducer', () => {
    test('returns the initial state for unknown action', () => {
        expect(reducer(undefined, {})).toEqual({
            pending: false,
            movies: [],
            error: null,
            sortBy: 'release_date',
            sortOrder: 'desc',
            filerByGenres: [],
            search: '',
            searchBy: 'title',
            movieToOverview: null,
        });
    });

    it('handle FETCH_MOVIES_PENDING', () => {
        const setPending = {
            type: actionType.FETCH_MOVIES_PENDING,
        };
        expect(reducer({}, setPending)).toEqual({ pending: true });
    });

    it('handle SET_MOVIES', () => {
        const setMovies = {
            type: actionType.SET_MOVIES,
            payload: { movies: ['1', '2'] }
        };
        expect(reducer({}, setMovies)).toEqual({
            pending: false,
            movies: ['1', '2']
        });
    });

    it('handle FETCH_MOVIES_ERROR', () => {
        const setError = {
            type: actionType.FETCH_MOVIES_ERROR,
            payload: { error: 'test' }
        };
        expect(reducer({}, setError)).toEqual({
            pending: false,
            error: 'test'
        });
    });

    it('handle SET_SORT_BY', () => {
        const setSortBy = {
            type: actionType.SET_SORT_BY,
            payload: { sortBy: 'release_date' }
        };
        expect(reducer({}, setSortBy)).toEqual({
            sortBy: 'release_date'
        });
    });

    it('handle SET_SORT_ORDER', () => {
        const setSortOrder = {
            type: actionType.SET_SORT_ORDER,
            payload: { sortOrder: 'asc' }
        };
        expect(reducer({}, setSortOrder)).toEqual({
            sortOrder: 'asc'
        });
    });

    it('handle SET_FILTER_BY_GENRES', () => {
        const setFilter = {
            type: actionType.SET_FILTER_BY_GENRES,
            payload: { genres: ['Drama', 'Action'] }
        };
        expect(reducer({}, setFilter)).toEqual({
            filerByGenres: ['Drama', 'Action']
        });
    });

    it('handle SET_SEARCH', () => {
        const setSearch = {
            type: actionType.SET_SEARCH,
            payload: { search: 'test' }
        };
        expect(reducer({}, setSearch)).toEqual({
            search: 'test'
        });
    });

    it('handle SET_SEARCH_BY', () => {
        const setSearchBy = {
            type: actionType.SET_SEARCH_BY,
            payload: { searchBy: 'title' }
        };
        expect(reducer({}, setSearchBy)).toEqual({
            searchBy: 'title'
        });
    });

    it('handle SET_MOVIE_TO_OVERVIEW', () => {
        const setMovieToOverview = {
            type: actionType.SET_MOVIE_TO_OVERVIEW,
            payload: { movieToOverview: { id: 1, title: 'movie' } }
        };
        expect(reducer({}, setMovieToOverview)).toEqual({
            movieToOverview: { id: 1, title: 'movie' }
        });
    });
});
