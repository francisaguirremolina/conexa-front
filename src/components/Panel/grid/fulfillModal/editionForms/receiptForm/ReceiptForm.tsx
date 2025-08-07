import React, { FC } from 'react';
import { Data } from '@/@types/panel';
import { useForm } from '@mantine/form';
import Switch from '@/components/units/Switch';

import styles from '../../fulfillModal.module.sass';

interface Props {
  formInfo: Data;
  saveChanges: (e: any) => void;
  isLoading: boolean;
  isReadOnly: boolean;
}

const ReceiptForm: FC<Props> = ({ formInfo, saveChanges, isLoading, isReadOnly }) => {
  const form = useForm({
    initialValues: {
      isReceiptActive: formInfo?.receiptSettings?.isReceiptActive || false,
    },
  });

  return (
    <>
      {!isLoading ? (
        <>
          {!isReadOnly ? (
            <div className={styles.fulfill_body_module}>
              <h2 className={styles.fulfill_body_mainTitle}>Remito</h2>
              <div className={styles.form_receipt_wrapper}>
                <p>Imprimir remito:</p>
                <Switch
                  id="isReceiptActive"
                  value={form.values.isReceiptActive}
                  checked={form.values.isReceiptActive}
                  onChangeFn={form.onSubmit((values) => {
                    let switchValue = values.isReceiptActive ? false : true;
                    saveChanges({
                      receiptSettings: {
                        isReceiptActive: switchValue,
                        receiptConfig: formInfo?.receiptSettings?.receiptConfig,
                      },
                    });
                  })}
                  labelTxt={`${form.values.isReceiptActive ? 'Sí' : 'No'}`}
                  extraClass="reverse"
                />
              </div>
            </div>
          ) : (
            <div className={styles.fulfill_body_module}>
              <h2 className={styles.fulfill_body_mainTitle}>Remito</h2>
              <div className={styles.receipt_info_module}>
                <p>Imprimir remito:</p>
                <p>{`${formInfo?.receiptSettings?.isReceiptActive ? 'Sí' : 'No'}`}</p>
              </div>
            </div>
          )}
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default ReceiptForm;
