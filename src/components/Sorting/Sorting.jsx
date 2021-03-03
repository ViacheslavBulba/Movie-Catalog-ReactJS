import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import './Sorting.css';
import PropTypes from 'prop-types';

export default function Sorting(props) {
    const [selectedOption, setSelectedOption] = useState(props.orderBy);

    const sortByOptions = ['RELEASE DATE', 'NAME (A-Z)'];

    const onSelectionChange = (e) => {
        setSelectedOption(e.value);
        props.changeOrder(e.value);
    };

    return (
        <div>
            <span className='dropdown-label'>SORT BY:</span>
            <Dropdown
                value={selectedOption}
                options={sortByOptions}
                onChange={onSelectionChange}
            />
        </div>
    );
}

Sorting.propTypes = {
    changeOrder: PropTypes.func.isRequired,
    orderBy: PropTypes.string.isRequired,
};
