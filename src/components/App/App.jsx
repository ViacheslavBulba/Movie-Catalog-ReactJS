import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Filtering from '../Filtering/Filtering';
import Sorting from '../Sorting/Sorting';
import ResultsCount from '../ResultsCount/ResultsCount';
import MovieList from '../MovieList/MovieList';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import MovieOverview from '../MovieOverview/MovieOverview';
import { Switch, Route, useLocation } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import config from 'config';
import axios from 'axios';

export default function App() {
    const [movieToOverview, setMovieToOverview] = useState(null);

    let location = useLocation();

    const checkPathForId = () => {
        const regEx = /^\/film\/(\d+)$/i;
        if (regEx.test(location.pathname)) {
            const found = location.pathname.match(regEx);
            const movieId = found[1];
            axios
                .get(`${config.apiUrl}/movies/${movieId}`)
                .then((response) => {
                    changeMovieToOverview(response.data);
                })
                .catch((error) => {
                    // handle error
                });
        }
    };

    const changeMovieToOverview = useCallback(
        (movie) => setMovieToOverview(movie),
        [movieToOverview]
    );

    const closeOverview = useCallback(() => setMovieToOverview(null), [
        movieToOverview,
    ]);

    useEffect(() => {
        checkPathForId();
    }, []);

    return (
        <Switch>
            <Route path={['/', '/film/:id']} exact>
                <ErrorBoundary>
                    {movieToOverview ? (
                        <MovieOverview
                            movie={movieToOverview}
                            closeOverview={closeOverview}
                        />
                    ) : (
                        <Header />
                    )}
                    <div className='divider' />
                    <main className='main-container'>
                        <div className='filtering-and-sorting-container'>
                            <Filtering />
                            <Sorting />
                        </div>
                        <ResultsCount />
                        <MovieList showOverview={changeMovieToOverview} />
                    </main>
                    <Footer />
                </ErrorBoundary>
            </Route>
            <Route path='*'>
                <PageNotFound />
            </Route>
        </Switch>
    );
}
