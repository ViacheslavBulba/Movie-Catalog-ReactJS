import React from 'react';
import Header from '../Header/Header';
import Filtering from '../Filtering/Filtering';
import Sorting from '../Sorting/Sorting';
import ResultsCount from '../ResultsCount/ResultsCount';
import MovieList from '../MovieList/MovieList';

export default function SearchView() {
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
