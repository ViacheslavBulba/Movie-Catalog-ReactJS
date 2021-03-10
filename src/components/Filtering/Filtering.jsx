import React from 'react';
import './Filtering.css';
import PropTypes from 'prop-types';

export default function Filtering(props) {
    const onFilterChange = (value) => {
        let filters = props.genresFilter;
        if (value === 'All') {
            filters = [];
        } else {
            if (filters.includes(value)) {
                filters = filters.filter((k) => k !== value);
            } else {
                filters = [...filters, value];
            }
        }
        props.onFilterChange(filters);
    };

    return (
        <div className='filter-container'>
            <button
                className={
                    'filter-option ' +
                    (props.genresFilter.length === 0 ? 'filter-active' : '')
                }
                onClick={() => onFilterChange('All')}
            >
                All
            </button>
            <button
                className={
                    'filter-option ' +
                    (props.genresFilter.includes('Drama')
                        ? 'filter-active'
                        : '')
                }
                onClick={() => onFilterChange('Drama')}
            >
                Drama
            </button>
            <button
                className={
                    'filter-option ' +
                    (props.genresFilter.includes('Fantasy')
                        ? 'filter-active'
                        : '')
                }
                onClick={() => onFilterChange('Fantasy')}
            >
                Fantasy
            </button>
            <button
                className={
                    'filter-option ' +
                    (props.genresFilter.includes('Comedy')
                        ? 'filter-active'
                        : '')
                }
                onClick={() => onFilterChange('Comedy')}
            >
                Comedy
            </button>
            <button
                className={
                    'filter-option ' +
                    (props.genresFilter.includes('Action')
                        ? 'filter-active'
                        : '')
                }
                onClick={() => onFilterChange('Action')}
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
