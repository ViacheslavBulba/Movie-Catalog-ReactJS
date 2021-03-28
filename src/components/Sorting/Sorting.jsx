import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import './Sorting.css';

import { setSortBy, setSortOrder, thunkedSetMovies } from '../../store/actions';
import store from '../../store/store';
import { useSelector } from 'react-redux';

export default function Sorting() {
    const sortBy = useSelector((state) => state.sortBy);

    const sortByOptions = [
        { label: 'RELEASE DATE', value: 'release_date' },
        { label: 'NAME (A-Z)', value: 'title' },
    ];

    const onSelectionChange = (e) => {
        store.dispatch(setSortBy(e.value));
        if (e.value === 'title') {
            store.dispatch(setSortOrder('asc'));
        } else {
            store.dispatch(setSortOrder('desc'));
        }
        store.dispatch(thunkedSetMovies());
    };

    return (
        <div>
            <span className='dropdown-label'>SORT BY:</span>
            <Dropdown
                value={sortBy}
                options={sortByOptions}
                onChange={onSelectionChange}
            />
        </div>
    );
}
