import React from 'react';
import renderer from 'react-test-renderer';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { MemoryRouter } from 'react-router';
import MovieList from './MovieList';

const mockStore = configureStore();

const initialState = {
  pending: false,
  movies: [
    {
      id: 1,
      title: 'mock movie 1',
      tagline: 'mock tagline 1',
      vote_average: 9.9,
      vote_count: 0,
      release_date: '2021-04-18',
      poster_path: 'https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg',
      overview: 'mock overview',
      budget: 1000,
      revenue: 2000,
      genres: ['Drama', 'Romance'],
      runtime: 90,
    },
    {
      id: 2,
      title: 'mock movie 2',
      tagline: 'mock tagline 2',
      vote_average: 9.9,
      vote_count: 0,
      release_date: '2021-01-01',
      poster_path: 'https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg',
      overview: 'mock overview 2',
      budget: 1000,
      revenue: 2000,
      genres: ['Drama', 'Romance'],
      runtime: 100,
    },
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

test('snapshot test for movie list', () => {
  const component = renderer.create(
    <MemoryRouter>
      <Provider store={store}>
        <MovieList />
      </Provider>
    </MemoryRouter>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
