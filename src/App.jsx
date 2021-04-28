import 'isomorphic-fetch';
import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';

import './index.css';
import MyApp from './components/App/MyApp';

const App = ({ Router, location, context, store }) => (
    <Provider store={store}>
        <Router location={location} context={context}>
            <MyApp />
        </Router>
    </Provider>
);

export default hot(module)(App);
