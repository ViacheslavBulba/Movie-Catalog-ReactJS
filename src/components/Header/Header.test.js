import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

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
    movieToOverview: null,
};

const store = mockStore(initialState)

test('snapshot test for header', () => {
    const component = renderer.create(
        <Provider store={store}>
            <Header />
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
