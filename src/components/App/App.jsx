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

import store from '../../store/store';
import {
    fetchMoviesPending,
    fetchMoviesSuccess,
    fetchMoviesError,
    sortMovies,
} from '../../store/actions';

export default function App() {
    const [movieToOverview, setMovieToOverview] = useState(null);

    const changeMovieToOverview = useCallback(
        (movie) => setMovieToOverview(movie),
        [movieToOverview]
    );

    const closeOverview = useCallback(() => setMovieToOverview(null), [
        movieToOverview,
    ]);

    const fetchMovies = () => {
        store.dispatch(fetchMoviesPending());
        fetch('http://localhost:4000/movies')
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    throw res.error;
                }
                store.dispatch(fetchMoviesSuccess(res.data));
                store.dispatch(sortMovies('RELEASE DATE')); //TODO remove first sorting from here
                return res.data;
            })
            .catch((error) => {
                store.dispatch(fetchMoviesError(error));
            });
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <>
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
        </>
    );
}
