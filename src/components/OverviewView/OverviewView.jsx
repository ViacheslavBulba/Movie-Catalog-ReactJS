import React from 'react';
import Filtering from '../Filtering/Filtering';
import Sorting from '../Sorting/Sorting';
import ResultsCount from '../ResultsCount/ResultsCount';
import MovieList from '../MovieList/MovieList';
import MovieOverview from '../MovieOverview/MovieOverview';

export default function OverviewView() {
    return (
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
    );
}
