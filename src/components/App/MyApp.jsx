import './App.css';

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Footer from '../Footer/Footer';
import OverviewView from '../OverviewView/OverviewView';
import PageNotFound from '../PageNotFound/PageNotFound';
import SearchView from '../SearchView/SearchView';

export default function MyApp() {
    return (
        <ErrorBoundary>
            <Switch>
                <Route path={['/', '/search/:title']} exact>
                    <SearchView />
                </Route>
                <Route path={'/film/:id'} exact>
                    <OverviewView />
                </Route>
                <Route path='*'>
                    <PageNotFound />
                </Route>
            </Switch>
            <Footer />
        </ErrorBoundary>
    );
}
