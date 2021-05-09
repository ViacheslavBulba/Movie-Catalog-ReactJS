import React from 'react';
import renderer from 'react-test-renderer';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Filtering from './Filtering';

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

const store = mockStore(initialState);

test('snapshot test for filtering', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Filtering />
    </Provider>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
