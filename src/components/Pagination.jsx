import React from 'react';
import { Link } from 'react-router-dom';
import { usePagination, DOTS } from '../utils/usePagination';

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = (e) => {
    e.preventDefault();
    onPageChange(currentPage + 1);
  };

  const onPrevious = (e) => {
    e.preventDefault();
    onPageChange(currentPage - 1);
  };

  const calculateMaxValue = () => {
    const maxValue = pageSize * currentPage;

    if (totalCount / currentPage > pageSize) {
      return maxValue;
    }
    return totalCount;
  };

  const calculateMinValue = () => {
    const maxValue = pageSize * currentPage;
    const minValue = maxValue - (pageSize - 1);
    return minValue;
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="pagination" id="pagination-label">
      <p className="govuk-visually-hidden" aria-labelledby="pagination-label">Pagination navigation</p>

      <ul className="pagination__list">
        <li key="previous" className="pagination__item  pagination__item--prev">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            className={`pagination__link ${currentPage === 1 ? 'disabled' : ''} `}
            to="#"
            onClick={onPrevious}
          >
            Previous
            <span className="govuk-visually-hidden">
              set of pages
            </span>
          </Link>
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li
                key={`${index + 1}-dots`}
                className="pagination__item pagination__item--dots"
                data-testid="dots"
              >
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={pageNumber}
              className={`pagination__item ${pageNumber === currentPage ? 'pagination__item--active' : ''} `}
            >
              {pageNumber === currentPage ? pageNumber : null}
              {pageNumber !== currentPage
                && (
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <Link
                    className="pagination__link"
                    data-testid="pagination"
                    onClick={(e) => { e.preventDefault(); onPageChange(pageNumber); }}
                    to="#"
                  >
                    {pageNumber}
                  </Link>
                )}
            </li>
          );
        })}
        <li key="next" className="pagination__item  pagination__item--next">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            className={`pagination__link ${currentPage === lastPage ? 'disabled' : ''} `}
            to="#"
            onClick={onNext}
          >
            Next
            <span className="govuk-visually-hidden">
              set of pages
            </span>
          </Link>
        </li>
      </ul>
      <p className="pagination__results">
        {`Showing ${calculateMinValue()} to ${calculateMaxValue()} of ${totalCount} results`}
      </p>
    </div>
  );
};

export default Pagination;
