import React, { useState, FC } from 'react';
import { FetchOrders, OrderDetails } from '@/@types/panel';

import Table from '../table/Table';
import TopBar from '../topbar/TopBar';

import styles from './grid.module.sass';

interface FilterSetter {
  dateFrom: string;
  dateTo: Date | any;
  status: string;
  dispatchType: string;
  sort: number;
  searchTag: string;
}

interface Props {
  filterSetter: (e: FilterSetter) => void;
  filters: FilterSetter;
  ordersList: OrderDetails[];
  getOrders: FetchOrders;
  clickedTarget: string;
  refresh: () => void;
  detectClickedTarget: (e: any) => void;
  rawData: OrderDetails[];
}

const Grid: FC<Props> = ({
  filterSetter,
  filters,
  ordersList,
  getOrders,
  clickedTarget,
  refresh,
  detectClickedTarget,
  rawData,
}) => {
  const [ordersSelected, setOrdersSelected] = useState([]);

  const tableProps = { ordersList, ordersSelected, setOrdersSelected, updateTable: getOrders, clickedTarget, rawData };

  return (
    <div id={styles.fullgrid} onClick={(e) => detectClickedTarget(e)}>
      <TopBar
        updateList={getOrders}
        cleanUpFilters={() =>
          filterSetter({
            dateFrom: '1970-01-01T00:00:00Z',
            dateTo: new Date(),
            status: 'all',
            dispatchType: 'all',
            sort: -1,
            searchTag: '',
          })
        }
        filters={filters}
        filterSetter={filterSetter}
        ordersSelected={ordersSelected}
        refresh={refresh}
      />
      <Table {...tableProps} />
    </div>
  );
};

export default Grid;
