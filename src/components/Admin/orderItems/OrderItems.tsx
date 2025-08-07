import React, { FC } from 'react';
import { OrderData } from '@/@types/admin';
import ButtonSmall from '@/components/units/Button';
import { IoAlertCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';

import styles from './orderItems.module.sass';
import styleBtn from '../../units/button.module.sass';

interface Props {
  orderNumber: OrderData['orderNumber'];
  isCreated: boolean;
  typeError?: string;
  printSingleOrder: (orderNumber: number) => Promise<void>;
}

const OrderItems: FC<Props> = ({ orderNumber, isCreated, typeError, printSingleOrder }) => {
  const errorMessageMap: Record<string, string> = {
    'panel.order-not-from-oca': 'La orden no corresponde a OCA',
    'panel.order-not-found-in-tn': 'La orden no corresponde a OCA',
    'panel.tiendanube-unauthorized': 'Token vencido. Reinstala la app de Oca',
  };

  const errorMessage = errorMessageMap[typeError || ''] || 'Ocurrió un error inesperado';

  return (
    <div className={styles.orderItem_wrapper}>
      <div className={styles.text_icon_wrapper}>
        {isCreated ? (
          <IoCheckmarkCircleOutline size={32} className={`${styles.successful}`} />
        ) : (
          <IoAlertCircleOutline size={32} className={`${styles.danger}`} />
        )}
        <span>Orden #{orderNumber}</span>
      </div>
      {isCreated ? (
        <ButtonSmall
          type="button"
          btnTxt="Imprimir"
          onClickFn={() => printSingleOrder(orderNumber)}
          extraClass={`${styleBtn.small_padding} ${styleBtn.outlined}`}
        />
      ) : (
        <p className={`${styles.text_error_order}`}>{errorMessage}</p>
      )}
    </div>
  );
};

export default OrderItems;
