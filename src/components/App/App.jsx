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
import { useDispatch } from 'react-redux';

import {
    fetchMoviesPending,
    thunkedFetchMoviesSuccess,
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

    function fetchMovies() {
        return (dispatch) => {
            dispatch(fetchMoviesPending());
            dispatch(thunkedFetchMoviesSuccess());
            dispatch(sortMovies('release_date')); //TODO remove first sorting from here
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
