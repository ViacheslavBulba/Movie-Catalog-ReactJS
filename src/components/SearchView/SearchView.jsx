import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { setSearch, setSearchBy, thunkedSetMovies } from '../../store/actions';

import Filtering from '../Filtering/Filtering';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import ResultsCount from '../ResultsCount/ResultsCount';
import Sorting from '../Sorting/Sorting';
import { useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

export default function SearchView() {
    const dispatch = useDispatch();

    let location = useLocation();

    let { title } = useParams();

    const checkPathOnLanding = () => {
        if (location.pathname !== '/') {
            const searchValue = title;
            dispatch(setSearch(searchValue));
            dispatch(setSearchBy('title'));
            dispatch(thunkedSetMovies());
        }
    };

    useEffect(() => {
        checkPathOnLanding();
    }, []);

    return (
        <>
            <Header />
            <div className='divider' />
            <main className='main-container'>
                <div className='filtering-and-sorting-container'>
                    <Filtering />
                    {/* <Sorting /> */}
                </div>
                <ResultsCount />
                <MovieList />
            </main>
        </>
    );
}
