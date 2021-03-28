import React from 'react';
import './ResultsCount.css';
import { useSelector } from 'react-redux';

export default function ResultsCount() {
    const count = useSelector((state) => state.movies.length);

    return (
        <div className='result-count-container'>
            <b>{count}</b> movies found
        </div>
    );
}
