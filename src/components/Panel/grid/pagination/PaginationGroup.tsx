import React, {FC} from 'react';
import { PaginationTypes } from '@/@types/panel';
import { gridSizePerPageOptions } from '@/constants';
import PageInfo from './pageInfo/PageInfo';
import { Pagination } from './pagination/Pagination';

import styles from './paginationGroup.module.sass';
import SizePerPageSetter from './sizePerPage/SizePerPageSetter';

interface Props{
  paginationSetter: (e: any) => void;
  setShouldUpdatePagination: (e: any) => void;
  paginationData: PaginationTypes;
}
const PaginationGroup: FC<Props> = ({ paginationSetter, paginationData, setShouldUpdatePagination }) => {

  const handlePageChange = (page) => {
    setShouldUpdatePagination(true);
    paginationSetter( (prevState) => ({ ...prevState, currentPage: page }));
  }
  return (
    <div id={styles.sizePerPage_pageInfo_pagination_container}>
      <SizePerPageSetter
        sizeOptions={gridSizePerPageOptions}
        currentSize={paginationData.pageSize}
        setSize={paginationSetter}
      />
      <div className='d-flex justify-content-between align-items-center'>
        <PageInfo
          currentPage={paginationData.currentPage}
          pageSize={paginationData.pageSize}
          totalAmount={paginationData.totalAmount}
        />
        <Pagination
          className={styles.pagination_bar}
          // @ts-ignore
          siblingCount={2}
          currentPage={paginationData.currentPage}
          totalCount={paginationData.totalAmount}
          pageSize={paginationData.pageSize}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PaginationGroup;
