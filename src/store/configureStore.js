import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

export default (initialState) => {
    const store = createStore(reducer, initialState, applyMiddleware(thunk));

    return store;
};
