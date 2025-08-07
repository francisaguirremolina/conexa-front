import React, { useEffect, useState, FC } from 'react';
import { OrderDetails } from '@/@types/panel';
import PanelService from '@/services/api/panel';
import { useForm } from '@mantine/form';
import { validateSum, validation } from '@/services/validations.service';
import { fixedPackagesInfo } from '@/constants';
import ButtonSmall from '@/components/units/Button';

import styles from './setterPackage.module.sass';
import styleBtn from '../../../../../../units/button.module.sass';
import styleInput from '../../../../../../units/inputs.module.sass';

interface Props{
  orderInfo: OrderDetails;
  updateTable: () => void;
  handleClose: () => void;
}

const SetterPackage: FC<Props> = ({ orderInfo, handleClose, updateTable }) => {
  const [isPassingValuesSum, setIsPassingValuesSum] = useState(false);
  
  const form = useForm({
    initialValues: {
      width: orderInfo?.packageSettings.width || '',
      height: orderInfo?.packageSettings.height || '',
      length: orderInfo?.packageSettings.length || '',
    },
    validate: {
      width: (value: string | any) => validation(value, 'maxSize', 0, 0, 398),
      height: (value: string | any) => validation(value, 'maxSize', 0, 0, 398),
      length: (value: string | any) => validation(value, 'maxSize', 0, 0, 398),
    },
  });

  useEffect(() => {
    validateSum(form, setIsPassingValuesSum);
  }, [form]);
  
  const handleTextChange = (e) => {
    const splittedClass = e.target.className.split(" ");
    const fieldId = splittedClass[splittedClass.length-1];
    form.setFieldValue(`${fieldId}`, e.target.value);
  };

  const handleSelection = async(value: string) => {
    const splitted = value.split("x")
    const result: any = await PanelService.editSingleOrder({ packageSettings: { width: Number(splitted[0]), height: Number(splitted[1]), length: Number(splitted[2]), bulks: 1 }}, orderInfo.orderId);
    if(result.success){
      updateTable();
      handleClose();
    }
  };

  const handleManualSelection = async(values) => {
    form.validate()
    const body ={ packageSettings: { width: Number(values.width), height: Number(values.height), length: Number(values.length) }};
    const result: any = await PanelService.editSingleOrder(body, orderInfo.orderId);
    if(result.success){
      updateTable();
      handleClose();
    }
  };

  return (
    <div id={styles.package_modal_wrapper}>
      <p>Predeterminado</p>
      <div className={styles.inputs_labels_wrapper}>
        <span>Alto</span>
        <span>x</span>
        <span>Ancho</span>
        <span>x</span>
        <span>Largo</span>
      </div>
      <form className={styles.inputs_wrapper} onSubmit={form.onSubmit((values) => handleManualSelection(values))}>
        <input
          {...form.getInputProps('height')}
          type="number"
          className={`${styles.form_control} ${styles.remove_arrow} ${form.errors.height ? `${styles.is_invalid_special}` : ''} height`}
          id={`dropdown-package-${orderInfo.orderId}`}
          placeholder=""
          onChange={handleTextChange}
          value={form.values.height}
        />
        <input
          {...form.getInputProps('width')}
          type="number"
          className={`${styles.form_control} ${styles.remove_arrow} ${form.errors.width ? `${styles.is_invalid_special}` : ''} width`}
          id={`dropdown-package-${orderInfo.orderId}`}
          placeholder=""
          onChange={handleTextChange}
          value={form.values.width}
        />
        <input
          {...form.getInputProps('length')}
          type="number"
          className={`${styles.form_control} ${styles.remove_arrow} ${form.errors.length ? `${styles.is_invalid_special}` : ''} length`}
          id={`dropdown-package-${orderInfo.orderId}`}
          placeholder=""
          onChange={handleTextChange}
          value={form.values.length}
        />
        <button type='submit' disabled={!isPassingValuesSum}></button>
      </form>
      {!isPassingValuesSum && <span className={`${styleInput.invalid_msg}`}>El valor de las 3 medidas no puede superar los 400 cm</span>}
      <div>
        <p>Caja OCA</p>
        <ul className={styles.package_options_list}>
          {fixedPackagesInfo.map((item: any, index) => (
            <li className={styles.package_options_item} key={index} id={`dropdown-package-${orderInfo.orderId}`}>
              <ButtonSmall
                type="button"
                btnTxt={`${item.size}`}
                showSpinner={false}
                isDisabled={false}
                onClickFn={() => handleSelection(item.size)}
                extraClass={styleBtn.btn_link}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SetterPackage;
