import React from 'react';
import renderer from 'react-test-renderer';
import MovieOverview from './MovieOverview';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { MemoryRouter } from 'react-router';

const mockStore = configureStore();

const initialState = {
    pending: false,
    movies: [],
    error: null,
    sortBy: 'release_date',
    sortOrder: 'desc',
    filerByGenres: [],
    search: '',
    searchBy: 'title',
    movieNotFoundById: false,
    movieToOverview: {
        'id': 1,
        'title': 'mock movie',
        'tagline': 'mock tagline',
        'vote_average': 9.9,
        'vote_count': 0,
        'release_date': '2021-04-18',
        'poster_path': 'https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg',
        'overview': 'mock overview',
        'budget': 1000,
        'revenue': 2000,
        'genres': ['Drama', 'Romance'],
        'runtime': 90
    },
};

const store = mockStore(initialState);

test('snapshot test for movie overview', () => {
    const component = renderer.create(
        <MemoryRouter>
            <Provider store={store}>
                <MovieOverview />
            </Provider>
        </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
