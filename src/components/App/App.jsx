import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Filtering from '../Filtering/Filtering';
import Sorting from '../Sorting/Sorting';
import ResultsCount from '../ResultsCount/ResultsCount';
import MovieList from '../MovieList/MovieList';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import MovieOverview from '../MovieOverview/MovieOverview';

export default function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const [orderBy, setOrderBy] = useState('RELEASE DATE');
    const [genresFilter, setGenresFilter] = useState([]);
    const [movieToOverview, setMovieToOverview] = useState(null);

    const changeOrder = useCallback((order) => setOrderBy(order), [orderBy]);

    const onFilterChange = useCallback((filters) => setGenresFilter(filters), [
        genresFilter,
    ]);

    const addMovie = useCallback(
        (movie) => setMovieList([...movieList, movie]),
        [movieList]
    );

    const deleteMovie = useCallback(
        (id) => {
            setMovieList(movieList.filter((movie) => movie.id !== id));
            fetch('http://localhost:4000/movies/' + id, {
                method: 'DELETE',
            });
        },
        [movieList]
    );

    const updateMovie = useCallback(
        (movie) => {
            let movies = movieList;
            const movieIndex = movies.findIndex((x) => x.id === movie.id);
            movies[movieIndex] = movie;
            setMovieList([...movies]);
        },
        [movieList]
    );

    const changeMovieToOverview = useCallback(
        (movie) => setMovieToOverview(movie),
        [movieToOverview]
    );

    const closeOverview = useCallback(() => setMovieToOverview(null), [
        movieToOverview,
    ]);

    const filteredSortedMovies = useMemo(
        () =>
            movieList
                .sort((a, b) => {
                    return orderBy === 'RELEASE DATE'
                        ? Date.parse(b.release_date) -
                              Date.parse(a.release_date)
                        : a.title.localeCompare(b.title);
                })
                .filter((movie) => {
                    return (
                        !genresFilter.length ||
                        movie.genres.some((genre) =>
                            genresFilter.includes(genre)
                        )
                    );
                }),
        [orderBy, genresFilter, movieList]
    );

    useEffect(() => {
        fetch('http://localhost:4000/movies')
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setMovieList(result.data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <ErrorBoundary>
                    {movieToOverview ? (
                        <MovieOverview
                            movie={movieToOverview}
                            closeOverview={closeOverview}
                        />
                    ) : (
                        <Header addMovie={addMovie} />
                    )}
                    <div className='divider' />
                    <main className='main-container'>
                        <div className='filtering-and-sorting-container'>
                            <Filtering
                                genresFilter={genresFilter}
                                onFilterChange={onFilterChange}
                            />
                            <Sorting
                                orderBy={orderBy}
                                changeOrder={changeOrder}
                            />
                        </div>
                        <ResultsCount count={filteredSortedMovies.length} />
                        <MovieList
                            movies={filteredSortedMovies}
                            deleteMovie={deleteMovie}
                            updateMovie={updateMovie}
                            showOverview={changeMovieToOverview}
                        />
                    </main>
                    <Footer />
                </ErrorBoundary>
            </>
        );
    }
}
