import axios from 'axios';
import config from 'config';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setMovieNotFoundById, setMovieToOverview } from '../../store/actions';
import store from '../../store/store';
import Filtering from '../Filtering/Filtering';
import MovieList from '../MovieList/MovieList';
import MovieOverview from '../MovieOverview/MovieOverview';
import PageNotFound from '../PageNotFound/PageNotFound';
import ResultsCount from '../ResultsCount/ResultsCount';
import Sorting from '../Sorting/Sorting';

export default function OverviewView() {
    let { id } = useParams();

    const movieNotFound = useSelector((state) => state.movieNotFoundById);

    const checkPathOnLanding = () => {
        axios
            .get(`${config.apiUrl}/movies/${id}`)
            .then((response) => {
                store.dispatch(setMovieToOverview(response.data));
            })
            .catch(() => {
                store.dispatch(setMovieNotFoundById(true));
            });
    };

    useEffect(() => {
        checkPathOnLanding();
    }, []);

    return (
        <>
            {movieNotFound ? (
                <PageNotFound />
            ) : (
                <>
                    <MovieOverview />
                    <div className='divider' />
                    <main className='main-container'>
                        <div className='filtering-and-sorting-container'>
                            <Filtering />
                            <Sorting />
                        </div>
                        <ResultsCount />
                        <MovieList />
                    </main>
                </>
            )}
        </>
    );
}
