import React from 'react';
import '../css/Filtering.css';

export default function Filtering() {
    throw new Error('I crashed!');

    return (
        <div className="filter-container">
            <button className="filter-option">ALL</button>
            <button className="filter-option">DOCUMENTARY</button>
            <button className="filter-option">COMEDY</button>
            <button className="filter-option">HORROR</button>
            <button className="filter-option">CRIME</button>
        </div>
    );
}
