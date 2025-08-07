import React, { useState, useEffect } from 'react';
import PanelService from '@/services/api/panel';
import Navigation from '@/components/Onboarding/navigation/Navigation';
import Switch from '@/components/units/Switch';

import styles from './receiptForm.module.sass';
import ReceiptPreview from './receiptPreview/ReceiptPreview';
import ReceiptSelectors from './receiptSelectors/ReceiptSelectors';
import { useForm } from '@mantine/form';

const ReceiptForm = () => {
  const [isGettingInfo, setIsGettingInfo] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isReceiptActive, setIsReceiptActive] = useState(false);
  const form = useForm({
    initialValues: {
      isOrderInfoIncluded: false,
      isRemitterIncluded: false,
      isNotesIncluded: false,
      isClientIdIncluded: false,
    },
  });

  useEffect(() => {
    getReceiptConfig();
  }, []);

  const handleMainSwitch = (e) => {
    setIsReceiptActive(!isReceiptActive);
    if (!e.target.checked) {
      form.reset();
    }
  };

  const handleChange = (e) => {    
    form.setFieldValue(`${e.target.id}`, e.target.checked);
  };

  const getReceiptConfig = async () => {
    setIsGettingInfo(true);
    const result: any = await PanelService.getReceiptGeneralConfig();
    if (result?.success) {
      setIsReceiptActive(result.receiptSettings.isReceiptActive)
      form.setValues({...result?.receiptSettings.receiptConfig});
    }
    setIsGettingInfo(false);
  };

  const saveReceiptConfig = async (values) => {
    form.validate();
    setIsLoading(true);
    await PanelService.setReceiptGeneralConfig({
      receiptSettings: { isReceiptActive: isReceiptActive, receiptConfig: values },
    });
    setIsLoading(false);
  };

  return (
    <form id={`${styles.form_wrapper}`} onSubmit={form.onSubmit((values) => saveReceiptConfig(values))}>
      {!isGettingInfo && (
        <>
          <div className={styles.form_group_container}>
            <div className={styles.form_receipt_wrapper}>
              <p>Imprimir remito:</p>
              <Switch
                id="isReceiptActive"
                value={isReceiptActive}
                checked={isReceiptActive}
                onChangeFn={handleMainSwitch}
                labelTxt={`${isReceiptActive ? 'Sí' : 'No'}`}
                extraClass="reverse"
              />
            </div>

            <div className={styles.form_receipt_selectors_wrapper}>
              <ReceiptSelectors
                customData={form.values}
                setCustomData={handleChange}
                isReceiptActive={isReceiptActive}
              />
              <ReceiptPreview isReceiptActive={isReceiptActive} customData={form.values} />
            </div>
          </div>
          <Navigation btnType="submit" btnSpinner={isLoading} btnTxt="Guardar" />
        </>
      )}
    </form>
  );
};

export default ReceiptForm;
