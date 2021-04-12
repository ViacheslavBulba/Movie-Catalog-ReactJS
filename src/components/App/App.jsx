import './App.css';

import axios from 'axios';
import config from 'config';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';

import {
    setMovieNotFoundById,
    setMovieToOverview,
    setSearch,
    setSearchBy,
    thunkedSetMovies,
} from '../../store/actions';
import store from '../../store/store';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Footer from '../Footer/Footer';
import OverviewView from '../OverviewView/OverviewView';
import PageNotFound from '../PageNotFound/PageNotFound';
import SearchView from '../SearchView/SearchView';

export default function App() {
    const movieNotFound = useSelector((state) => state.movieNotFoundById);

    let location = useLocation();

    const checkPathOnLanding = () => {
        const searchRegExp = /^\/search\/(.*?)$/i;
        if (searchRegExp.test(location.pathname)) {
            const found = location.pathname.match(searchRegExp);
            const searchValue = found[1].replaceAll('%20', ' ');
            console.log(searchValue);
            store.dispatch(setSearch(searchValue));
            store.dispatch(setSearchBy('title')); // re-setting it to 'title' here in case it is changed by other component
            store.dispatch(thunkedSetMovies());
            return;
        }
        const overviewRegExp = /^\/film\/(\d+)$/i;
        if (overviewRegExp.test(location.pathname)) {
            const found = location.pathname.match(overviewRegExp);
            const movieId = found[1];
            axios
                .get(`${config.apiUrl}/movies/${movieId}`)
                .then((response) => {
                    store.dispatch(setMovieToOverview(response.data));
                })
                .catch((error) => {
                    store.dispatch(setMovieNotFoundById(true));
                });
            return;
        }
    };

    useEffect(() => {
        checkPathOnLanding();
    }, []);

    return (
        <ErrorBoundary>
            <Switch>
                <Route path={['/', '/search/:title']} exact>
                    <SearchView />
                </Route>
                <Route path={'/film/:id'} exact>
                    {movieNotFound ? <PageNotFound /> : <OverviewView />}
                </Route>
                <Route path='*'>
                    <PageNotFound />
                </Route>
            </Switch>
            <Footer />
        </ErrorBoundary>
    );
}
