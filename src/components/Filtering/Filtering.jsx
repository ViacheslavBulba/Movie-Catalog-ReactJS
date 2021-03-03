import React, { useState } from 'react';
import './Filtering.css';
import PropTypes from 'prop-types';

export default function Filtering(props) {
    const [activeFilters, setActiveFilters] = useState(props.genresFilter);

    const onFilterChange = (e) => {
        let filters = activeFilters;
        if (e.target.innerHTML === 'All') {
            filters = [];
        } else {
            if (filters.includes(e.target.innerHTML)) {
                filters = filters.filter((k) => k != e.target.innerHTML);
            } else {
                filters = [...filters, e.target.innerHTML];
            }
        }
        setActiveFilters(filters);
        props.onFilterChange(filters);
    };

    return (
        <div className='filter-container'>
            <button
                className={
                    'filter-option ' +
                    (activeFilters.length === 0 ? 'filter-active' : '')
                }
                onClick={onFilterChange}
            >
                All
            </button>
            <button
                className={
                    'filter-option ' +
                    (activeFilters.includes('Drama') ? 'filter-active' : '')
                }
                onClick={onFilterChange}
            >
                Drama
            </button>
            <button
                className={
                    'filter-option ' +
                    (activeFilters.includes('Fantasy') ? 'filter-active' : '')
                }
                onClick={onFilterChange}
            >
                Fantasy
            </button>
            <button
                className={
                    'filter-option ' +
                    (activeFilters.includes('Comedy') ? 'filter-active' : '')
                }
                onClick={onFilterChange}
            >
                Comedy
            </button>
            <button
                className={
                    'filter-option ' +
                    (activeFilters.includes('Action') ? 'filter-active' : '')
                }
                onClick={onFilterChange}
            >
                Action
            </button>
        </div>
    );
}

Filtering.propTypes = {
    genresFilter: PropTypes.arrayOf(PropTypes.string.isRequired),
    onFilterChange: PropTypes.func.isRequired,
};
