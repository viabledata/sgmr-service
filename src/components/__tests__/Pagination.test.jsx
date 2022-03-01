import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { usePagination, DOTS } from '../../utils/usePagination';
import Pagination from '../Pagination';

const renderPage = (props) => {
  return render(
    <BrowserRouter>
      <Pagination {...props} />
    </BrowserRouter>,
  );
};

const props = {
  onPageChange: jest.fn(),
  totalCount: 50,
  pageSize: 10,
  siblingCount: 1,
  currentPage: 1,
};

describe('Pagination', () => {
  it('should show range from 1 to totalPageCount if the total page count is less than page pills', () => {
    renderPage(props);
    const { result } = renderHook(() => usePagination(props));
    const paginationRange = [1, 2, 3, 4, 5];
    const pageLinks = screen.getAllByTestId('pagination');

    expect(result.current).toStrictEqual(paginationRange);
    // The currentPage will not have a link
    expect(pageLinks).toHaveLength(4);
    // Current page = 1
    expect(screen.getByText(1)).toBeInTheDocument();
  });

  it('should show DOTS on right side', () => {
    const propsDots = {
      totalCount: 100,
      pageSize: 10,
      siblingCount: 1,
      currentPage: 1,
    };
    renderPage(propsDots);
    const { result } = renderHook(() => usePagination(propsDots));
    const paginationRange = [1, 2, 3, 4, 5, DOTS, 10];
    const pageLinks = screen.getAllByTestId('pagination');
    const dots = screen.getAllByTestId('dots');

    expect(result.current).toStrictEqual(paginationRange);
    // The currentPage will not have a link
    expect(pageLinks).toHaveLength(5);
    // Current page = 1
    expect(screen.getByText(1)).toBeInTheDocument();
    expect(dots).toHaveLength(1);
  });

  it('should show DOTS on left side', () => {
    const propsDots = {
      totalCount: 100,
      pageSize: 10,
      siblingCount: 1,
      currentPage: 9,
    };
    renderPage(propsDots);
    const { result } = renderHook(() => usePagination(propsDots));
    const paginationRange = [1, DOTS, 6, 7, 8, 9, 10];
    const pageLinks = screen.getAllByTestId('pagination');
    const dots = screen.getAllByTestId('dots');

    expect(result.current).toStrictEqual(paginationRange);
    expect(pageLinks).toHaveLength(5);
    expect(screen.getByText(9)).toBeInTheDocument();
    expect(dots).toHaveLength(1);
  });

  it('should show DOTS on left and right', () => {
    const propsDots = {
      totalCount: 100,
      pageSize: 10,
      siblingCount: 1,
      currentPage: 5,
    };
    renderPage(propsDots);
    const { result } = renderHook(() => usePagination(propsDots));
    const paginationRange = [1, DOTS, 4, 5, 6, DOTS, 10];
    const pageLinks = screen.getAllByTestId('pagination');
    const dots = screen.getAllByTestId('dots');

    expect(result.current).toStrictEqual(paginationRange);
    expect(pageLinks).toHaveLength(4);
    expect(screen.getByText(5)).toBeInTheDocument();
    expect(dots).toHaveLength(2);
  });

  it('should handle clicks on the next arrow correctly', () => {
    renderPage(props);
    const next = screen.getByText('Next');

    fireEvent.click(next);
    expect(props.onPageChange).toHaveBeenCalledWith(props.currentPage + 1);
  });

  it('should handle clicks on the previous arrow correctly', () => {
    renderPage(props);
    const previous = screen.getByText('Previous');

    fireEvent.click(previous);
    expect(props.onPageChange).toHaveBeenCalledWith(props.currentPage - 1);
  });

  it('should handle clicks on page buttons correctly', () => {
    renderPage(props);

    const pageThree = screen.getByText('3');
    const pageFive = screen.getByText('5');
    const pageTwo = screen.getByText('2');

    fireEvent.click(pageThree);
    expect(props.onPageChange).toHaveBeenCalledWith(3);

    fireEvent.click(pageFive);
    expect(props.onPageChange).toHaveBeenCalledWith(5);

    fireEvent.click(pageTwo);
    expect(props.onPageChange).toHaveBeenCalledWith(2);
  });
});
