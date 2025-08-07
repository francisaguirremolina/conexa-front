import React, { useEffect, useState } from 'react';
import PanelService from '@/services/api/panel';

import Skeleton from 'react-loading-skeleton';
import Grid from '../grid/Grid';
import PaginationGroup from '../pagination/PaginationGroup';

import 'react-loading-skeleton/dist/skeleton.css';
import { extractInfoFromCookies } from '@/services/utils.service';

const GridContainer = () => {
  const userId = extractInfoFromCookies('userId');
  const [isLoading, setIsLoading] = useState(true);
  const [paginationData, setPaginationData] = useState({
    totalAmount: 0,
    currentPage: 1,
    pageSize: 5,
    paginationFrom: 0,
  });
  const [ordersFilters, setOrdersFilters] = useState({
    dateFrom: '1970-01-01T00:00:00Z',
    dateTo: new Date().toISOString(),
    status: 'all',
    dispatchType: 'all',
    sort: -1,
    searchTag: '',
  });
  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [clickedTarget, setClickedTarget] = useState('');
  const [shouldUpadatePagination, setShouldUpdatePagination] = useState(false);

  const getOrdersList = async (
    from = paginationData.paginationFrom,
    limit = paginationData.pageSize,
    dateFrom = ordersFilters.dateFrom,
    dateTo = ordersFilters.dateTo,
    status = ordersFilters.status,
    dispatchType = ordersFilters.dispatchType,
    sort = ordersFilters.sort,
    tag = ordersFilters.searchTag,
  ) => {
    setIsLoading(true);
    const result: any = await PanelService.getOrders(from, limit, dateFrom, dateTo, status, dispatchType, sort, tag);
    if (result && result.success) {
      if (rawData.length === 0) {
        setRawData(result?.data);
      }
      setFilteredData(result?.data);
      setPaginationData((prevState) => ({ ...prevState, totalAmount: result.totalOrders }));
    }
    setIsLoading(false);
  };

  const changePagination = () => {
    const firstPageIndex = (paginationData.currentPage - 1) * paginationData.pageSize;
    setPaginationData((prevState) => ({ ...prevState, paginationFrom: firstPageIndex }));
  };

  useEffect(() => {
    if (shouldUpadatePagination) {
      changePagination();
      setShouldUpdatePagination(false);
    }
  }, [paginationData.currentPage]);

  useEffect(() => {
    if (userId) {
      getOrdersList(
        paginationData.paginationFrom,
        paginationData.pageSize,
        '1970-01-01T00:00:00Z',
        new Date().toISOString(),
        'all',
        ordersFilters.dispatchType,
        -1,
        '',
      );
    }
  }, [paginationData.paginationFrom, paginationData.pageSize]);

  const refresh = () => {
    setOrdersFilters({
      dateFrom: '1970-01-01T00:00:00Z',
      dateTo: new Date().toISOString(),
      status: 'all',
      dispatchType: 'all',
      sort: -1,
      searchTag: '',
    });
    getOrdersList(
      paginationData.paginationFrom,
      paginationData.pageSize,
      '1970-01-01T00:00:00Z',
      new Date().toISOString(),
      'all',
      'all',
      -1,
      '',
    );
  };

  const detectClickedTarget = (e) => {
    setClickedTarget(e.target.id);
  };

  const gridProps = {
    filterSetter: setOrdersFilters,
    filters: ordersFilters,
    ordersList: filteredData,
    getOrders: getOrdersList,
    clickedTarget,
    refresh,
    detectClickedTarget,
    rawData,
  };
  return (
    <>
      {isLoading ? <Skeleton count={1} height={400} style={{ marginBottom: '10px' }} /> : <Grid {...gridProps} />}
      <PaginationGroup
        paginationSetter={setPaginationData}
        paginationData={paginationData}
        setShouldUpdatePagination={setShouldUpdatePagination}
      />
    </>
  );
};

export default GridContainer;
