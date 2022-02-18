import { useMemo } from 'react';

const DOTS = '...';

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
};

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  // Will run when any value in dependency array changes
  const paginationRange = useMemo(() => {
    // Plus 5 includes first page, last page, current page and the 2 DOTS
    const totalPageNumbers = siblingCount + 5;
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Calculate left and right sibling to ensure values are within 1 and totalPageCount
    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPageCount);

    // Prevent dots from showing when there is only one page number between the siblings and the min/max page
    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPageCount - 2;

    const firstPage = 1;
    const lastPage = totalPageCount;

    // 1) When total page count is less than the page numbers we want to show (1-5)
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    // 2) When there are no left dots but right dots are shown
    if (!showLeftDots && showRightDots) {
      const leftItemNum = 5 * siblingCount;
      const leftRange = range(1, leftItemNum);
      return [...leftRange, DOTS, totalPageCount];
    }

    // 3) When there are left dots shown but no right dots
    if (showLeftDots && !showRightDots) {
      const rightItemNum = 5 * siblingCount;
      const rightRange = range(totalPageCount - rightItemNum + 1, totalPageCount);

      return [firstPage, DOTS, ...rightRange];
    }

    // 4) When there are both right and left dots
    if (showLeftDots && showRightDots) {
      const middleRange = range(leftSibling, rightSibling);
      return [firstPage, DOTS, ...middleRange, DOTS, lastPage];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

export {
  usePagination,
  DOTS,
};
