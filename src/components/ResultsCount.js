
import React from 'react';
import '../css/ResultsCount.css';

export default function ResultsCount(props) {

    return (
        <div className="result-count-container">
            <b>{props.count}</b> movies found
        </div>
    );
}
