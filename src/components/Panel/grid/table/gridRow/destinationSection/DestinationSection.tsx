import React, { useState, useEffect, FC } from 'react';
import { OrderDetails } from '@/@types/panel';
import { capitalizeFirstLetter } from '@/services/utils.service';
import { validateBeforeClosingDropdown } from '@/services/grid.service';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import styles from '../gridRow.module.sass';
import StoreFinder from './storeFinder/StoreFinder';

interface Props {
  orderInfo: OrderDetails;
  clickedTarget: string;
  updateTable: () => void;
}

const DestinationSection: FC<Props> = ({ orderInfo, clickedTarget, updateTable }) => {
  const [storeFinderOpen, setStoreFinderOpen] = useState(false);

  useEffect(() => {
    validateBeforeClosingDropdown(
      clickedTarget,
      `dropdown-destination-${orderInfo.orderId}`,
      storeFinderOpen,
      setStoreFinderOpen,
    );
  }, [clickedTarget]);

  const handleCursorTypeStyles = () => {
    if (orderInfo.defaultDispatchType === 'store' && orderInfo.trackingStatus !== 'PENDING') {
      return styles.dropdownDisabled;
    }
    return '';
  };

  const handleButtonClick = () => {
    if (orderInfo.trackingStatus === 'PENDING') {
      setStoreFinderOpen(!storeFinderOpen);
    }
  };

  return (
    <li className={styles.cell_destination}>
      {orderInfo.defaultDispatchType === 'home' ? (
        <p>Domicilio</p>
      ) : orderInfo.defaultDispatchType === 'locker' ? (
        <p>Locker</p>
      ) : (
        <button
          className={`${styles.gridRow_btn_dropdown} ${
            storeFinderOpen ? styles.selected : ''
          } ${handleCursorTypeStyles()}`}
          type="button"
          onClick={handleButtonClick}
          id={`dropdown-package-${orderInfo.orderId}`}
        >
          <div
            className="d-flex justify-content-between align-items-center"
            id={`dropdown-destination-${orderInfo.orderId}`}
          >
            <p id={`dropdown-destination-${orderInfo.orderId}`}>Sucursal</p>
            {orderInfo.trackingStatus === 'PENDING' && (
              <>
                {storeFinderOpen ? (
                  <FiChevronUp size={16} id={`dropdown-destination-${orderInfo.orderId}`} />
                ) : (
                  <FiChevronDown size={16} id={`dropdown-destination-${orderInfo.orderId}`} />
                )}
              </>
            )}
          </div>
        </button>
      )}
      <p className={styles.secondary}>
        {capitalizeFirstLetter(orderInfo.shippingAddress.street)} {orderInfo.shippingAddress.number}
      </p>
      {storeFinderOpen && orderInfo.defaultDispatchType === 'store' && (
        <StoreFinder orderInfo={orderInfo} handleClose={() => setStoreFinderOpen(false)} updateTable={updateTable} />
      )}
    </li>
  );
};

export default DestinationSection;
