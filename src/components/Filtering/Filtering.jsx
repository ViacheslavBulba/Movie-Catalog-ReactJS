import React from 'react';
import './Filtering.css';
import { useSelector } from 'react-redux';
import { setFilterByGenres, thunkedSetMovies } from '../../store/actions';
import store from '../../store/store';

export default function Filtering() {
  const genresFilter = useSelector((state) => state.filerByGenres);

  const onFilterChange = (value) => {
    let filters = genresFilter;
    if (value === 'All') {
      filters = [];
    } else if (filters.includes(value)) {
      filters = filters.filter((k) => k !== value);
    } else {
      filters = [...filters, value];
    }
    store.dispatch(setFilterByGenres(filters));
    store.dispatch(thunkedSetMovies());
  };

  return (
    <div className="filter-container">
      <button
        className={
                    `filter-option ${
                      genresFilter.length === 0 ? 'filter-active' : ''}`
                }
        onClick={() => onFilterChange('All')}
        type="button"
      >
        All
      </button>
      <button
        className={
                    `filter-option ${
                      genresFilter.includes('Drama') ? 'filter-active' : ''}`
                }
        onClick={() => onFilterChange('Drama')}
        type="button"
      >
        Drama
      </button>
      <button
        className={
                    `filter-option ${
                      genresFilter.includes('Fantasy') ? 'filter-active' : ''}`
                }
        onClick={() => onFilterChange('Fantasy')}
        type="button"
      >
        Fantasy
      </button>
      <button
        className={
                    `filter-option ${
                      genresFilter.includes('Comedy') ? 'filter-active' : ''}`
                }
        onClick={() => onFilterChange('Comedy')}
        type="button"
      >
        Comedy
      </button>
      <button
        className={
                    `filter-option ${
                      genresFilter.includes('Action') ? 'filter-active' : ''}`
                }
        onClick={() => onFilterChange('Action')}
        type="button"
      >
        Action
      </button>
    </div>
  );
}
