import './ResultsCount.css';

import React from 'react';
import { useSelector } from 'react-redux';

import Paging from '../Paging/Paging';

export default function ResultsCount() {
    const count = useSelector((state) => state.resultsCount);
    const pagingCurrentPage = useSelector((state) => state.pagingCurrentPage);
    const pagingPageSize = useSelector((state) => state.pagingPageSize);
    const startIndex = pagingCurrentPage * pagingPageSize - pagingPageSize + 1;

    let endIndex = startIndex + pagingPageSize - 1;
    let amountOfPages = Math.ceil(count / pagingPageSize);
    if (endIndex > count && pagingCurrentPage == 1) {
        endIndex = count;
    }
    if (pagingCurrentPage == amountOfPages) {
        endIndex = count;
    }

    return (
        <>
            {count !== 0 && (
                <div className='result-count-container'>
                    <div className='total-movies'>
                        <b>{count}</b> movies found
                    </div>
                    <Paging />
                    <div className='showing-results'>
                        Showing results <b>{startIndex}</b> - <b>{endIndex}</b>
                    </div>
                </div>
            )}
        </>
    );
}
