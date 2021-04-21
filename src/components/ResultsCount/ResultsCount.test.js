import React from 'react';
import renderer from 'react-test-renderer';
import ResultsCount from './ResultsCount';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

const initialState = {
    pending: false,
    movies: [
        {
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
        }
    ],
    error: null,
    sortBy: 'release_date',
    sortOrder: 'desc',
    filerByGenres: [],
    search: '',
    searchBy: 'title',
    movieToOverview: null,
};

const store = mockStore(initialState);

test('snapshot test for results count', () => {
    const component = renderer.create(
        <Provider store={store}>
            <ResultsCount />
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
