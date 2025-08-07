import React, {FC} from 'react';
import { ReceiptValues } from '@/@types/panel';
import Switch from '@/components/units/Switch';

import styles from '../receiptForm.module.sass';

interface Props {
  isReceiptActive: boolean;
  customData: ReceiptValues;
  setCustomData: (e: any) => void;
}

const ReceiptSelectors: FC<Props> = ({ customData, setCustomData, isReceiptActive }) => {
  return (
    <ul className={styles.form_receipt_switchers}>
      <li>
        <Switch
          id="isOrderInfoIncluded"
          value={customData.isOrderInfoIncluded}
          checked={customData.isOrderInfoIncluded}
          onChangeFn={setCustomData}
          labelTxt="Incluir información de la orden"
          isDisabled={!isReceiptActive}
        />
      </li>
      <li>
        <Switch
          id="isRemitterIncluded"
          value={customData.isRemitterIncluded}
          checked={customData.isRemitterIncluded}
          onChangeFn={setCustomData}
          labelTxt="Incluir remitente"
          isDisabled={!isReceiptActive}
        />
      </li>
      <li>
        <Switch
          id="isNotesIncluded"
          value={customData.isNotesIncluded}
          checked={customData.isNotesIncluded}
          onChangeFn={setCustomData}
          labelTxt="Incluir notas del cliente"
          isDisabled={!isReceiptActive}
        />
      </li>
      <li>
        <Switch
          id="isClientIdIncluded"
          value={customData.isClientIdIncluded}
          checked={customData.isClientIdIncluded}
          onChangeFn={setCustomData}
          labelTxt="Incluir el DNI del destinatario"
          isDisabled={!isReceiptActive}
        />
      </li>
    </ul>
  );
};

export default ReceiptSelectors;
