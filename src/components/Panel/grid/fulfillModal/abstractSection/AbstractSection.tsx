import React, { FC } from 'react';
import { Data, Item } from '@/@types/panel';
import { capitalizeFirstLetter } from '@/services/utils.service';

import styles from '../fulfillModal.module.sass';
import { useCrossDataStore } from '@/store';

interface Props {
  orderData: Data;
  isLoading: boolean;
}

const AbstractSection: FC<Props> = ({ orderData, isLoading }) => {
  
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);
  return (
    <div className={`${styles.fulfill_body_module} mt-0`}>
      {!isLoading ? (
        <>
          <h2 className={styles.fulfill_body_mainTitle}>Orden</h2>
          <ul className={styles.fulfill_product_list}>
            {orderData.items.map((item: Item, index: number) => (
              <li className={styles.fulfill_product_item} key={`item-${index}`}>
                <span className={`${styles.limit_width} lg`}>
                  x{item?.quantity || 1} {capitalizeFirstLetter(item?.name)}
                </span>
                <span>${Number(item?.price) * (item?.quantity || 1)}</span>
              </li>
            ))}
          </ul>
          <hr />
          <div className={styles.fulfill_product_cost}>
            <span>Subtotal</span>
            <span>${orderData.subTotal}</span>
          </div>
          <div className={styles.fulfill_product_cost}>
            <span>Costo de envío</span>
            <span>${orderData?.shippingCost}</span>
          </div>
          {
              orderData && parseFloat(orderData.taxCost) > 0 && ecommerceSelected === 'vtex' && (
              <div className={styles.fulfill_product_cost}>
                <span>Impuestos</span>
                <span>${orderData?.taxCost}</span>
              </div>
            )
          }
          {(parseInt(orderData.discount))!== 0 && orderData.discount !== undefined && (
            <div className={styles.fulfill_product_cost}>              
              <span>Descuento</span>
              <span>${orderData?.discount}</span>
            </div>
          )}
          <div className={styles.fulfill_product_cost}>
            <span>TOTAL</span>
            <span className={`${styles.semibold} ${styles.large} mt-0`}>${orderData.totalSpent}</span>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default AbstractSection;
