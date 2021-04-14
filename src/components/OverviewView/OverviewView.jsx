import axios from 'axios';
import config from 'config';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { setMovieToOverview } from '../../store/actions';
import store from '../../store/store';
import Filtering from '../Filtering/Filtering';
import MovieList from '../MovieList/MovieList';
import MovieOverview from '../MovieOverview/MovieOverview';
import PageNotFound from '../PageNotFound/PageNotFound';
import ResultsCount from '../ResultsCount/ResultsCount';
import Sorting from '../Sorting/Sorting';

export default function OverviewView() {
    let { id } = useParams();

    const [movieNotFound, setMovieNotFound] = useState(false);

    const getMovieOnLanding = () => {
        axios
            .get(`${config.apiUrl}/movies/${id}`)
            .then((response) => {
                setMovieNotFound(false);
                store.dispatch(setMovieToOverview(response.data));
            })
            .catch(() => {
                setMovieNotFound(true);
            });
    };

    useEffect(() => {
        getMovieOnLanding();
    }, [id]);

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
