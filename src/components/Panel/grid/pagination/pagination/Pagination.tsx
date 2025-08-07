import type { FC } from 'react';
import React from 'react';

import { DOTS, usePagination } from '../../../../../hooks/usePagination';
import styles from '../paginationGroup.module.sass';

interface Props {
  onPageChange: (e: any) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}

export const Pagination: FC<Props> = ({
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
  
  // @ts-ignore
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  // @ts-ignore
  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={styles.pagination_container}>
      <li className={`${styles.pagination_item} ${currentPage === 1 && styles.disabled}`} onClick={onPrevious}>
        <div className={`${styles.arrow} ${styles.left}`} />
      </li>
      {/* @ts-ignore */}
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li className={`${styles.pagination_item} dots`} key={`pagination-${index}`}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={`${styles.pagination_item} ${pageNumber === currentPage && styles.selected}`}
            onClick={() => onPageChange(pageNumber)}
            key={`pagination-${index}`}
          >
            {pageNumber}
          </li>
        );
      })}
      <li className={`${styles.pagination_item} ${currentPage === lastPage && styles.disabled}`} onClick={onNext}>
        <div className={`${styles.arrow} ${styles.right}`} />
      </li>
    </ul>
  );
};
