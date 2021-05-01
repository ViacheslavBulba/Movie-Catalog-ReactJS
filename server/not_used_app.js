const express = require('express');

const app = express();

if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
    const webpackConfig = require('../webpack');

    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler.compilers.find(c => c.name === 'client')));
    app.use(webpackHotServerMiddleware(compiler));
} else {
    //const serverRenderer = require('./public/js/serverRenderer').default;
    const serverRenderer = require('./server-build/index.js').default;

    app.use(express.static('public'));
    app.use(express.static('./server-build'));
    app.use(serverRenderer());
}

module.exports = app;
