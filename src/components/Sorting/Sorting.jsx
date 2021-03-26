import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import './Sorting.css';
import PropTypes from 'prop-types';

import { sortMovies } from '../../store/actions';
import store from '../../store/store';
import { connect } from 'react-redux';

function Sorting(props) {
    const sortByOptions = [
        { label: 'RELEASE DATE', value: 'release_date' },
        { label: 'NAME (A-Z)', value: 'title' },
    ];

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

Sorting.propTypes = {
    sortBy: PropTypes.string.isRequired,
};
