/* eslint-disable no-console */
import Image from 'next/image';
import React, { FC, useState, useEffect } from 'react';
import { FetchOrders, FilterState } from '@/@types/panel';
import PanelService from '@/services/api/panel';
import { printLabel } from '@/services/grid.service';

import { ButtonSmall } from '@/components/units/Button';

import styleBtn from '../../../units/button.module.sass';
import SearchAndFilters from './searchAndFilters/SearchAndFilters';
import styles from './topBar.module.sass';
import { useCrossDataStore, useModalsStore } from '@/store';

interface SelectedState {
  orderId: string;
  orderNumber: string;
  orderStatus: string;
}

interface Props {
  updateList: FetchOrders;
  cleanUpFilters: () => void;
  filters: FilterState;
  filterSetter: (e: any) => void;
  ordersSelected: SelectedState[];
  refresh: () => void;
}

const TopBar: FC<Props> = ({ updateList, cleanUpFilters, filters, filterSetter, ordersSelected, refresh }) => {
  const [ordersToCreate, setOrdersToCreate] = useState<string[]>([]);
  const [ordersToPrint, setOrdersToPrint] = useState<string[]>([]);
  const [isFulfillmentLoading, setIsFulfillmentLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const { ecommerce } = useCrossDataStore();

  const categorizeByStatus = () => {
    let pendingOrders: string[] = [];
    let restOfOrders: string[] = [];
    const isEcommerceVtex = ecommerce.id === 'vtex';
    ordersSelected.forEach((ord) => {
      const validOrder = isEcommerceVtex ? ord.orderNumber : ord.orderId;
      if (ord.orderStatus === 'PENDING') {
        pendingOrders.push(validOrder);
      } else if (ord.orderStatus !== 'ERROR') {
        restOfOrders.push(validOrder);
      }
    });
    setOrdersToCreate(pendingOrders);
    setOrdersToPrint(restOfOrders);
  };

  useEffect(() => {
    categorizeByStatus();
  }, [ordersSelected]);

  const createOrders = async () => {
    try {
      if (isFulfillmentLoading) return;
      setIsFulfillmentLoading(true);
      const result: any = await PanelService.fulfillNewOrders({ orderIds: [...ordersToCreate] });
      if (result.success) {
        updateList();
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsFulfillmentLoading(false);
    }
  };

  const setToPrintOrders = async () => {
    const MAX_BATCH_SIZE = parseInt(process.env.MAX_PRINT_BATCH_SIZE || '20', 10);
    const batches: string[][] = [];

    for (let i = 0; i < ordersToPrint.length; i += MAX_BATCH_SIZE) {
      batches.push(ordersToPrint.slice(i, i + MAX_BATCH_SIZE));
    }
    if (batches.length > 1) {
      useModalsStore.getState().setNotification({
        message: `La impresión de etiquetas se generará en ${batches.length} lotes. La operación puede demorar unos segundos.`,
        type: 'warning',
        length: 1,
        showTime: batches.length * 5000,
      });
    }
    try {
      setLoader(true);
      for (const batch of batches) {
        const result: any = await PanelService.printOrders({ orderIds: batch }, { suppressSuccessAlert: true });
        if (result?.success) {
          printLabel(result?.data);
        }
      }
      if (batches.length > 1) {
        useModalsStore.getState().setNotification({
          message: 'Todas las etiquetas se imprimieron correctamente.',
          type: 'success',
          length: 1,
        });
      }
      updateList();
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className={styles.topBar_container}>
      <div className="d-flex align-items-center">
        <SearchAndFilters
          filters={filters}
          filterSetter={filterSetter}
          getFilteredOrders={updateList}
          cleanUpFilters={cleanUpFilters}
        />
        {ordersToCreate.length > 0 && (
          <ButtonSmall
            type="button"
            onClickFn={createOrders}
            btnTxt={`Crear órdenes (${ordersToCreate.length})`}
            isDisabled={isFulfillmentLoading}
            showSpinner={isFulfillmentLoading}
            extraClass={`${styleBtn.inside_grid}`}
          />
        )}
        {ordersToPrint.length > 0 && (
          <ButtonSmall
            type="button"
            onClickFn={setToPrintOrders}
            btnTxt={`Imprimir etiqueta (${ordersToPrint.length})`}
            showSpinner={loader}
            extraClass={`${styleBtn.inside_grid} ${styleBtn.outlined}`}
          />
        )}
      </div>
      <div>
        <button className={styles.update_btn} onClick={() => refresh()}>
          <Image src={'/assets/images/icons/refresh.svg'} alt="refresh" width={16} height={16} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
