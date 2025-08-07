import React, { FC } from 'react';
import { ReceiptValues } from '@/@types/panel';

import styles from '../receiptForm.module.sass';

interface Props {
  isReceiptActive: boolean;
  customData: ReceiptValues;
}

const ReceiptPreview: FC<Props> = ({ isReceiptActive, customData }) => {
  return (
    <div className={styles.form_receipt_preview}>
      {isReceiptActive && (
        <ul className={styles.receipt_list}>
          <li className={styles.receipt_item}>
            <div className={styles.two_columns}>
              <div className={styles.receipt_item}>
                <span className={styles.bold}>Orden: #0000</span>
                <span>Realizada el 00/00/0000</span>
              </div>
              <span className={`${styles.example} ${styles.align_right}`}>(nombre remitente)</span>
            </div>
            <hr />
          </li>
          {customData.isOrderInfoIncluded && (
            <li className={styles.receipt_item}>
              <div className={styles.two_columns}>
                <div className={styles.receipt_item}>
                  <span>Producto</span>
                  <span className={styles.example}>( nombre de producto )</span>
                </div>
                <div className={`${styles.receipt_item} ${styles.align_right}`}>
                  <span>Total</span>
                  <span>$00.00</span>
                </div>
              </div>
              <hr />
              <div className={styles.two_columns}>
                <div className={styles.receipt_item}>
                  <span>Subtotal:</span>
                  <span>Costo de envío:</span>
                  <span className={styles.bold}>Total:</span>
                </div>
                <div className={`${styles.receipt_item} ${styles.align_right}`}>
                  <span>$00.00</span>
                  <span>$00.00</span>
                  <span className={styles.bold}>$00.00</span>
                </div>
              </div>
              <hr />
              <span>
                Medio de pago: <span className={styles.example}>( detalle )</span>
              </span>
              <span>
                Envío: <span className={styles.example}>( detalle )</span>
              </span>
            </li>
          )}
          <li className={styles.receipt_item}>
            <span className={styles.bold}>Enviar a:</span>
            <span className={styles.example}>( nombre y apellido )</span>
            {customData.isClientIdIncluded && (
              <span>
                DNI: <span className={styles.example}>( número de Dni )</span>
              </span>
            )}
            <span>
              <span className={styles.bold}>Código postal:</span>{' '}
              <span className={styles.example}>( código postal )</span>
            </span>
            <hr />
          </li>
          {customData.isRemitterIncluded && (
            <li className={styles.receipt_item}>
              <span>Remitente:</span>
              <span className={styles.example}>( nombre remitente )</span>
              <span className={styles.example}>( código postal )</span>
              <span className={styles.example}>( provincia/localidad )</span>
              <span className={styles.example}>( país )</span>
              <hr />
            </li>
          )}
          {customData.isNotesIncluded && (
            <li className={styles.receipt_item}>
              <span>
                Notas: <span className={styles.example}>( detalle )</span>
              </span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ReceiptPreview;
