import React from 'react';

export default function ErrorBoundary(props) {

    const FallbackUI = () => (
        <div>
            Something went wrong!
        </div>
    )

    let noErrors = true;

    // not sure how to fully implement the error boundary in function component
    // because usually it requires the use of class component lifecycle method componentDidCatch()
    // and we are not fetching anything (not doing anything that can be used as a condition) in this home task yet, so not sure
    // also see https://stackoverflow.com/questions/48482619/how-can-i-make-use-of-error-boundaries-in-functional-react-components

    return (
        <>
            { noErrors ? props.children : <FallbackUI />}
        </>
    )
}
