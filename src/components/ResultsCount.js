
import React from 'react';
import '../css/ResultsCount.css';
import PropTypes from 'prop-types';

export default function ResultsCount(props) {

    return (
        <div className="result-count-container">
            <b>{props.count}</b> movies found
        </div>
    );
}

ResultsCount.propTypes = {
    count: PropTypes.number.isRequired,
};
