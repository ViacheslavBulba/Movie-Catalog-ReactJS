import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import '../css/Sorting.css';

export default function Sorting() {

    const [selectedOption, setSelectedOption] = useState('RELEASE DATE');

    const sortByOptions = [
        'RELEASE DATE',
        'NAME (A-Z)'
    ];

    const onSelectionChange = (e) => {
        setSelectedOption(e.value);
    };

    return (
        <div>
            <span className="dropdown-label">SORT BY:</span>
            <Dropdown value={selectedOption} options={sortByOptions} onChange={onSelectionChange} />
        </div>
    );
}
