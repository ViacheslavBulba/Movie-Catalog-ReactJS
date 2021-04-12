import React, { useEffect } from 'react';
import './App.css';
import Footer from '../Footer/Footer';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import OverviewView from '../OverviewView/OverviewView';
import SearchView from '../SearchView/SearchView';
import { Switch, Route, useLocation } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import config from 'config';
import axios from 'axios';
import { setMovieNotFoundById, setMovieToOverview } from '../../store/actions';
import store from '../../store/store';
import { useSelector } from 'react-redux';

export default function App() {
    const movieNotFound = useSelector((state) => state.movieNotFoundById);

    let location = useLocation();

    const checkPathForId = () => {
        const regEx = /^\/film\/(\d+)$/i;
        if (regEx.test(location.pathname)) {
            const found = location.pathname.match(regEx);
            const movieId = found[1];
            axios
                .get(`${config.apiUrl}/movies/${movieId}`)
                .then((response) => {
                    store.dispatch(setMovieToOverview(response.data));
                })
                .catch((error) => {
                    store.dispatch(setMovieNotFoundById(true));
                });
        }
    };

    useEffect(() => {
        checkPathForId();
    }, []);

    return (
        <ErrorBoundary>
            <Switch>
                <Route path={['/', '/search/']} exact>
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
