import React from 'react';
import './ResultsCount.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function ResultsCount(props) {
    return (
        <div className='result-count-container'>
            <b>{props.count}</b> movies found
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        count: state.movies.length,
    };
};

export default connect(mapStateToProps)(ResultsCount);

ResultsCount.propTypes = {
    count: PropTypes.number.isRequired,
};
