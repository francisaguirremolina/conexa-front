import React, { useState, useEffect, FC } from 'react';
import { FetchOrders, OrderDetails, OrdersSelectedTypes } from '@/@types/panel';

import { EmptyMessage } from './emptyMessage/EmptyMessage';
import GridRow from './gridRow/GridRow';
import TableHeader from './tableHeader/TableHeader';
import LoadingModal from '../loadingModal/LoadingModal';
import ReferenceModal from '../referenceModal/ReferenceModal';

import styles from './table.module.sass';

interface Props {
  ordersList: OrderDetails[];
  ordersSelected: OrdersSelectedTypes[];
  setOrdersSelected: (e: any) => void;
  clickedTarget: string;
  updateTable: FetchOrders;
  rawData: OrderDetails[];
}

const Table: FC<Props> = ({ ordersList, ordersSelected, setOrdersSelected, updateTable, clickedTarget, rawData }) => {
  const [showEmptyMsg, setshowEmptyMsg] = useState(false);
  const [showNotFoundMsg, setShowNotFoundMsg] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showReferenceModal, setShowReferenceModal] = useState(false);

  useEffect(() => {
    if (rawData.length === 0) {
      setshowEmptyMsg(true);
    } else {
      setshowEmptyMsg(false);
    }
    if (ordersList.length === 0) {
      setShowNotFoundMsg(true);
    } else {
      setShowNotFoundMsg(false);
    }
  }, [ordersList, rawData]);


  const gridRowProps = { ordersSelected, setOrdersSelected, updateTable, clickedTarget, setShowLoadingModal };
  return (
    <div className={`${styles.table_container} mt-3`}>
      <div className={styles.table_grid}>
        <TableHeader
          ordersList={ordersList}
          ordersSelected={ordersSelected}
          setOrdersSelected={setOrdersSelected}
          showReference={() => setShowReferenceModal(true)}
        />
        <div className={styles.table_body}>
          {showEmptyMsg ? <EmptyMessage msgType="emptyList" /> : <>{showNotFoundMsg && <EmptyMessage />}</>}
          {ordersList.map((itemInfo, index) => (
            <GridRow key={`row-${index}`} orderInfo={itemInfo} {...gridRowProps} />
          ))}
        </div>
      </div>
      <LoadingModal show={showLoadingModal} />
      <ReferenceModal show={showReferenceModal} handleClose={() => setShowReferenceModal(false)} />
    </div>
  );
};

export default Table;
