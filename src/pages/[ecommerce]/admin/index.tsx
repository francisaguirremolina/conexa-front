import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { AppConfig } from '@/config/app';
import PanelService from '@/services/api/panel';
import { getFadeInProps } from '@/services/animations.service';
import { printLabel } from '@/services/grid.service';

import { Main } from '@/templates/Main';
import { Meta } from '@/layouts/Meta';
import { Logos } from '@/components/Logos';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import ListContainer from '@/components/Admin/listContainer/ListContainer';

import styles from './admin.module.sass';
import { useCrossDataStore, useModalsStore } from '@/store';
import { OrderData } from '@/@types/admin';

const Admin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ordersList, setOrdersList] = useState<OrderData[]>([]);
  const [userIdNumber, setUserIdNumber] = useState('');

  useEffect(() => {
    extractStoreAndIds();
  }, []);

  const fulfillOrder = async (idList: string[]) => {
    try {
      const result: any = await PanelService.fulfillNewOrders({ orderIds: idList });
      if (result.success) {
        setOrdersList(result.data);
      }
    } catch (error: any) {
      const ordersFailed = error?.response.data.data.filter((orders) => orders.error);
      setOrdersList(ordersFailed);
    } finally {
      setIsLoading(false);
    }
  };

  const extractStoreAndIds = () => {
    const userId = new URLSearchParams(window.location.search).get('store');
    if (userId) {
      Cookies.set('userId', userId, { expires: 365 });
      setUserIdNumber(userId);
    }
    // @ts-ignore
    const url: any = new URL(window.location);
    const cleanUrl = url.search.replaceAll('[]', '');
    const idList = new URLSearchParams(cleanUrl).getAll('id');
    if (idList.length > 0) {
      fulfillOrder(idList);
    }
  };

  const setToPrintOrders = async () => {
    const MAX_BATCH_SIZE = parseInt(process.env.MAX_PRINT_BATCH_SIZE || '20', 10);
    const batches: string[][] = [];
    const availableOrders: string[] = ordersList
      .filter((order) => order?.success)
      .map((order) => order.orderNumber.toString());

    for (let i = 0; i < availableOrders.length; i += MAX_BATCH_SIZE) {
      batches.push(availableOrders.slice(i, i + MAX_BATCH_SIZE));
    }
    if (batches.length > 1) {
      useModalsStore.getState().setNotification({
        message: `La impresión de etiquetas se generará en ${batches.length} lote(s). La operación puede demorar unos segundos.`,
        type: 'warning',
        length: 1,
        showTime: batches.length * 5000,
      });
    }
    try {
      setIsLoading(true);
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
          showTime: 5000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const printSingleOrder: (orderNumber: number) => Promise<void> = async (orderNumber: number) => {
    try {
      setIsLoading(true);
      const result: any = await PanelService.printOrders({ orderIds: [orderNumber.toString()] });
      if (result?.success) {
        printLabel(result?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const { name } = useCrossDataStore((state) => state.ecommerce);

  return (
    <Main meta={<Meta title={`${AppConfig.site_name} - ${name}`} description="Admin Page" />}>
      <div className="container-fluid" id={`${styles.adminPage}`}>
        <div className="row">
          <div className="col-12 p-0 d-flex justify-content-center align-items-center">
            <Logos size="md" />
          </div>
        </div>
        <div className="row">
          <motion.div
            {...getFadeInProps({ delay: 1 })}
            className="col-12 p-0 d-flex flex-column justify-content-center align-items-center"
          >
            {isLoading ? (
              <div className={`${styles.loader_wrapper}`}>
                <div className={`${styles.text_wrapper}`}>
                  <SectionTitles
                    titleTxt="Cargando tus etiquetas..."
                    subTxt="No cierres esta pestaña, en unos minutos finalizaremos el proceso."
                    isCentered
                  />
                </div>
                <Image src={'/assets/images/loader-oca.gif'} alt="loading..." width={140} height={85} />
              </div>
            ) : (
              <ListContainer
                ordersList={ordersList}
                setToPrintOrders={setToPrintOrders}
                printSingleOrder={printSingleOrder}
                userIdNumber={userIdNumber}
              />
            )}
          </motion.div>
        </div>
      </div>
    </Main>
  );
};

export default Admin;
