/* eslint-disable no-console */
import Image from 'next/image';
import React, { useEffect, useState, FC } from 'react';
import { OrderDetails, OrdersSelectedTypes } from '@/@types/panel';

import CheckboxButton from '@/components/units/CheckboxButton';
import { capitalizeFirstLetter } from '@/services/utils.service';
import { dateFormatter } from '@/services/onboarding.service';
import { colorSetter, formatCheckboxSelection, statusTranslator } from '@/services/grid.service';

import ActionsSection from './actionsSection/ActionSection';
import DestinationSection from './destinationSection/DestinationSection';
import styles from './gridRow.module.sass';
import PackageSection from './packageSection/PackageSection';
import { useCrossDataStore } from '@/store';

interface Props {
  orderInfo: OrderDetails;
  ordersSelected: OrdersSelectedTypes[];
  setOrdersSelected: (e: any) => void;
  clickedTarget: string;
  updateTable: () => void;
  setShowLoadingModal: (e: boolean) => void;
}

const GridRow: FC<Props> = ({
  orderInfo,
  ordersSelected,
  setOrdersSelected,
  updateTable,
  clickedTarget,
  setShowLoadingModal,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);

  const validateSelection = () => {
    return ordersSelected.some((item) => item.orderId === orderInfo.orderId);
  };

  const setSelection = () => {
    if (isChecked) {
      const existingOrderIndex = ordersSelected.findIndex((ord) => ord.orderId === orderInfo.orderId);
      const allSelectedCopy = [...ordersSelected];
      allSelectedCopy.splice(existingOrderIndex, 1);
      setOrdersSelected(allSelectedCopy);
    } else {
      const newAddition = formatCheckboxSelection(orderInfo);
      setOrdersSelected([...ordersSelected, { ...newAddition }]);
    }
  };

  useEffect(() => {
    if (validateSelection()) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [orderInfo, ordersSelected]);

  const dropdownsProps = { orderInfo, clickedTarget, updateTable };
  const actionsProps = { orderInfo, updateTable, clickedTarget, setShowLoadingModal };

  return (
    <ul
      className={`${styles.table_row} ${isChecked && styles.row_checked} ${
        ['tiendanube', 'vtex'].includes(ecommerceSelected) ? `${styles.columns_tn}` : ''
      } px-4`}
    >
      <li>
        <CheckboxButton
          id={`${styles.select_all_orders}`}
          value="all"
          onChangeFn={setSelection}
          checked={isChecked}
          disabled={false}
          extraClassName="test"
        />
      </li>
      <li className={styles.cell_origin}>
        <p className={styles.black_semibold}>{orderInfo.orderNumber}</p>
        <p className={styles.secondary}>{dateFormatter(String(orderInfo.creationDate))}</p>
      </li>
      <li className={styles.cell_remitter}>
        <p className={styles.black_semibold}>
          {orderInfo.recipient?.fullName || orderInfo.recipient?.firstName + ' ' + orderInfo.recipient?.lastName}
        </p>
        <p className={styles.secondary}>{capitalizeFirstLetter(orderInfo.shippingAddress.province)}</p>
      </li>
      {!['tiendanube', 'vtex'].includes(ecommerceSelected) && <PackageSection {...dropdownsProps} />}
      <DestinationSection {...dropdownsProps} />
      <li className={styles.cell_status}>
        <Image
          src={colorSetter(orderInfo.trackingStatus)}
          alt={`${statusTranslator(orderInfo.trackingStatus)}`}
          width={12}
          height={12}
        />
        <p className={`${styles.black_semibold} ps-1`}>{orderInfo?.statusLabel ?? statusTranslator(orderInfo.trackingStatus)}</p>
        <p className={`${styles.black_semibold} ps-1`}>{}</p>
      </li>
      <ActionsSection {...actionsProps} />
    </ul>
  );
};

export default GridRow;
