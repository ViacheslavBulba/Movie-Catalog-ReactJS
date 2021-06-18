import './App.css';

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Footer from '../Footer/Footer';
import OverviewView from '../OverviewView/OverviewView';
import PageNotFound from '../PageNotFound/PageNotFound';
import SearchView from '../SearchView/SearchView';

import { useDispatch } from 'react-redux';
import { useEffect} from 'react';
import { fetchMoviesPending, thunkedSetMovies } from '../../store/actions';

export default function App() {

  function fetchMovies() {
    return (dispatch) => {
        dispatch(fetchMoviesPending());
        dispatch(thunkedSetMovies());
    };
  }

  const useFetching = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchMovies());
    }, []);
  };

  useFetching();

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
