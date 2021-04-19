import React from 'react';
import renderer from 'react-test-renderer';
import MovieOverview from './MovieOverview';

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

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
    movieToOverview: null,
};

const store = mockStore(initialState)

test('snapshot test for movie overview', () => {
    const component = renderer.create(
        <Provider store={store}>
            <MovieOverview />
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
