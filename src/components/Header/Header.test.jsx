import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Header from './Header';

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

describe('header', () => {
  it('snapshot test', () => {
    const component = renderer.create(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('enter some text into the search input', () => {
    const { container } = render(
      <Header />,
    );
    const searchInput = container.querySelector('input');
    expect(searchInput).toBeTruthy();
    userEvent.type(searchInput, 'hello');
    expect(searchInput.value).toBe('hello');
  });

  it('open and close form by clicking on add movie button', () => {
    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>,
    );
    expect(document.querySelector('form')).toBeNull();
    const addMovieButton = container.querySelector('.add-button');
    expect(addMovieButton.textContent).toBe('ADD MOVIE');
    fireEvent.click(addMovieButton); // open modal
    expect(document.querySelector('form')).not.toBeNull();
    expect(document.querySelector('.modal-title').textContent).toBe('ADD MOVIE');
    fireEvent.click(document.querySelector('.close > span')); // close modal
    expect(document.querySelector('form')).toBeNull();
  });

  it('text content for search button', () => {
    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>,
    );
    const searchButton = container.querySelector('button.search-button');
    expect(searchButton.textContent).toBe('SEARCH');
  });

  it('header find your movie is present', () => {
    const { container } = render(
      <Header />,
    );
    const header = container.querySelector('.header-text');
    expect(header.textContent).toBe('FIND YOUR MOVIE');
  });
});
