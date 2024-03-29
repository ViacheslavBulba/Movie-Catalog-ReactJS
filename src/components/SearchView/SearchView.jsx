import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { setSearch, setSearchBy, thunkedSetMovies } from '../../store/actions';
import store from '../../store/store';
import Filtering from '../Filtering/Filtering';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import ResultsCount from '../ResultsCount/ResultsCount';
import Sorting from '../Sorting/Sorting';
import { useLocation } from 'react-router-dom';

export default function SearchView() {
    let location = useLocation();

    let { title } = useParams();

    const checkPathOnLanding = () => {
        if (location.pathname !== '/') {
            const searchValue = title;
            store.dispatch(setSearch(searchValue));
            store.dispatch(setSearchBy('title'));
            store.dispatch(thunkedSetMovies());
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
                    <Sorting />
                </div>
                <ResultsCount />
                <MovieList />
            </main>
        </>
    );
}
