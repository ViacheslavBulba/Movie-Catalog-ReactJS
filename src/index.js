import { join } from 'lodash';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in DEV mode!');
} else {
    console.log('Looks like we are in PROD mode!');
}

function component() {
    const element = document.createElement('div');

    element.innerHTML = join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());
