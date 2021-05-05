import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import './Sorting.css';

import { setSortBy, setSortOrder, thunkedSetMovies } from '../../store/actions';
import { useSelector, useDispatch } from 'react-redux';

export default function Sorting() {
    const dispatch = useDispatch();

    const sortBy = useSelector((state) => state.sortBy);

    const sortByOptions = [
        { label: 'RELEASE DATE', value: 'release_date' },
        { label: 'NAME (A-Z)', value: 'title' },
    ];

    const onSelectionChange = (e) => {
        dispatch(setSortBy(e.value));
        if (e.value === 'title') {
            dispatch(setSortOrder('asc'));
        } else {
            dispatch(setSortOrder('desc'));
        }
        dispatch(thunkedSetMovies());
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
