import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import './Sorting.css';

import { sortMovies } from '../../store/actions';
import store from '../../store/store';
import { connect } from 'react-redux';

function Sorting(props) {
    const sortByOptions = ['RELEASE DATE', 'NAME (A-Z)'];

    const onSelectionChange = (e) => {
        store.dispatch(sortMovies(e.value));
    };

    return (
        <div>
            <span className='dropdown-label'>SORT BY:</span>
            <Dropdown
                value={props.sortBy}
                options={sortByOptions}
                onChange={onSelectionChange}
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        sortBy: state.sortBy,
    };
};

export default connect(mapStateToProps)(Sorting);
