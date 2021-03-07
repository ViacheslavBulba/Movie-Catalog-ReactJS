import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        error; // added this line for now to get rid off eslint error about unused variable
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        error; // added this line for now to get rid off eslint error about unused variable
        errorInfo; // added this line for now to get rid off eslint error about unused variable
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.any,
};
