import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from '../src/components/App/App';


import '../src/index.css';
import store from '../src/store/store';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

const PORT = process.env.PORT || 3006;
const app = express();

app.get('/', (req, res) => {
    const app = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter>
                <App />
            </StaticRouter>
        </Provider>
    );

    const indexHtml = path.resolve('./server-build/index.html');
    //const indexHtml = path.resolve('./src/index.html');

    fs.readFile(indexHtml, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('500 server error, please check the server!');
        }

        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        );
    });
});

app.use(express.static('./server-build'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
