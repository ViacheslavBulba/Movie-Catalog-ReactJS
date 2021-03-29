import React from 'react';
import './Filtering.css';
import { setFilterByGenres, thunkedSetMovies } from '../../store/actions';
import store from '../../store/store';
import { useSelector } from 'react-redux';

export default function Filtering() {
    const genresFilter = useSelector((state) => state.filerByGenres);

    const onFilterChange = (value) => {
        let filters = genresFilter;
        if (value === 'All') {
            filters = [];
        } else {
            if (filters.includes(value)) {
                filters = filters.filter((k) => k !== value);
            } else {
                filters = [...filters, value];
            }
        }
        store.dispatch(setFilterByGenres(filters));
        store.dispatch(thunkedSetMovies());
    };

    return (
        <div className='filter-container'>
            <button
                className={
                    'filter-option ' +
                    (genresFilter.length === 0 ? 'filter-active' : '')
                }
                onClick={() => onFilterChange('All')}
            >
                All
            </button>
            <button
                className={
                    'filter-option ' +
                    (genresFilter.includes('Drama') ? 'filter-active' : '')
                }
                onClick={() => onFilterChange('Drama')}
            >
                Drama
            </button>
            <button
                className={
                    'filter-option ' +
                    (genresFilter.includes('Fantasy') ? 'filter-active' : '')
                }
                onClick={() => onFilterChange('Fantasy')}
            >
                Fantasy
            </button>
            <button
                className={
                    'filter-option ' +
                    (genresFilter.includes('Comedy') ? 'filter-active' : '')
                }
                onClick={() => onFilterChange('Comedy')}
            >
                Comedy
            </button>
            <button
                className={
                    'filter-option ' +
                    (genresFilter.includes('Action') ? 'filter-active' : '')
                }
                onClick={() => onFilterChange('Action')}
            >
                Action
            </button>
        </div>
    );
}
