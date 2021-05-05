import axios from 'axios';
// import config from 'config';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { setMovieToOverview } from '../../store/actions';

import Filtering from '../Filtering/Filtering';
import MovieList from '../MovieList/MovieList';
import MovieOverview from '../MovieOverview/MovieOverview';
import PageNotFound from '../PageNotFound/PageNotFound';
import ResultsCount from '../ResultsCount/ResultsCount';
import Sorting from '../Sorting/Sorting';

import { useDispatch } from 'react-redux';

export default function OverviewView() {
    const dispatch = useDispatch();

    let { id } = useParams();

    const [movieNotFound, setMovieNotFound] = useState(false);

    const getMovieOnLanding = () => {
        axios
            .get(`http://localhost:4000/movies/${id}`)
            .then((response) => {
                setMovieNotFound(false);
                dispatch(setMovieToOverview(response.data));
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
