import './Paging.css';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { setCurrentPage, thunkedSetMovies } from '../../store/actions';
import store from '../../store/store';

export default function Paging() {
    const resultsCount = useSelector((state) => state.resultsCount);
    const pageSize = useSelector((state) => state.pagingPageSize);
    const currentPage = useSelector((state) => state.pagingCurrentPage);
    let activePage = 1;
    let amountOfPages = Math.ceil(resultsCount / pageSize);

    const goToNextPage = () => {
        store.dispatch(setCurrentPage(parseInt(currentPage) + 1));
        store.dispatch(thunkedSetMovies());
    };

    const goToPreviousPage = () => {
        store.dispatch(setCurrentPage(parseInt(currentPage) - 1));
        store.dispatch(thunkedSetMovies());
    };

    const onSpecificPageClick = (event) => {
        activePage = event.target.textContent;
        store.dispatch(setCurrentPage(parseInt(event.target.textContent)));
        store.dispatch(thunkedSetMovies());
    };

    const recalculateNumberOfButtonsWithPages = () => {
        let pageButtonsLimit = 5; // max number of pages to be shown in the pagination
        let start =
            Math.floor((currentPage - 1) / pageButtonsLimit) * pageButtonsLimit;
        if (resultsCount < pageSize) {
            pageButtonsLimit = 1;
        }
        if (amountOfPages < pageButtonsLimit) {
            pageButtonsLimit = amountOfPages;
        }
        return new Array(pageButtonsLimit)
            .fill()
            .map((_, idx) => start + idx + 1);
    };

    let pages = recalculateNumberOfButtonsWithPages();

    // useEffect(() => {
    //     pages = recalculateNumberOfButtonsWithPages();
    // }, [resultsCount, currentPage]);

    return (
        <>
            <div className='result-count-container'>
                <div className='pagination'>
                    <button
                        onClick={goToPreviousPage}
                        className={`prev ${
                            currentPage === 1 ? 'disabled' : ''
                        }`}
                    >
                        <span>&larr;</span>
                    </button>
                    {pages.map((item, index) => (
                        <button
                            key={index}
                            onClick={onSpecificPageClick}
                            className={`paginationItem ${
                                currentPage === item ? 'active' : ''
                            }`}
                        >
                            <span>{item}</span>
                        </button>
                    ))}
                    <button
                        onClick={goToNextPage}
                        className={`next ${
                            currentPage === amountOfPages ? 'disabled' : ''
                        }`}
                    >
                        <span>&rarr;</span>
                    </button>
                </div>
            </div>
        </>
    );
}
