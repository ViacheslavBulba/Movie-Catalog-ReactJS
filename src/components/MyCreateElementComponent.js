import React from 'react';

const myHeader = React.createElement(
    'h2',
    { id: 'my-id' },
    'Hello from React.createElement!'
);

function MyCreateElementComponent() {
    return myHeader;
}

export default MyCreateElementComponent;
