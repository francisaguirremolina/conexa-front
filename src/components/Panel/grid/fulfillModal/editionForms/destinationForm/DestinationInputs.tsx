import React, { FC } from 'react';

import styles from '../../fulfillModal.module.sass';

interface Props {
  form: any;
  isEditionAvailable: boolean;
  handleChange: (e: any) => void;
}

const DestinationInputs: FC<Props> = ({ form, isEditionAvailable, handleChange }) => {
  return (
    <>
      <div className={`${styles.input_wrapper_special} py-1`}>
        <label htmlFor="street" className={styles.form_label}>
          Calle
        </label>
        <input
          {...form.getInputProps('street')}
          type="text"
          className={`${styles.form_control} ${form.errors?.street ? `${styles.is_invalid_special}` : ''}`}
          id="street"
          placeholder=""
          onChange={handleChange}
          disabled={isEditionAvailable ? false : true}
          value={form.values.street}
        />
      </div>
      <div className={`${styles.input_wrapper_special} py-1`}>
        <label htmlFor="number" className={styles.form_label}>
          Número
        </label>
        <input
          {...form.getInputProps('number')}
          type="text"
          className={`${styles.form_control} ${form.errors?.number ? `${styles.is_invalid_special}` : ''}`}
          id="number"
          placeholder=""
          onChange={handleChange}
          disabled={isEditionAvailable ? false : true}
          value={form.values.number}
        />
      </div>
      <div className={`${styles.input_wrapper_special} py-1`}>
        <label htmlFor="floor" className={styles.form_label}>
          Piso/Departamento
        </label>
        <input
          {...form.getInputProps('floor')}
          type="text"
          className={`${styles.form_control} ${form.errors?.floor ? `${styles.is_invalid_special}` : ''}`}
          id="floor"
          placeholder=""
          onChange={handleChange}
          disabled={isEditionAvailable ? false : true}
          value={form.values.floor}
        />
      </div>
      <div className={`${styles.input_wrapper_special} py-1`}>
        <label htmlFor="postalCode" className={styles.form_label}>
          Código Postal
        </label>
        <input
          {...form.getInputProps('postalCode')}
          type="text"
          className={`${styles.form_control} ${form.errors?.postalCode ? `${styles.is_invalid_special}` : ''}`}
          id="postalCode"
          placeholder="Ej: 1414"
          onChange={handleChange}
          disabled={isEditionAvailable ? false : true}
          value={form.values.postalCode}
        />
      </div>
      <div className={`${styles.input_wrapper_special} py-1`}>
        <label htmlFor="locality" className={styles.form_label}>
          Localidad
        </label>
        <input
          {...form.getInputProps('locality')}
          type="text"
          className={`${styles.form_control} ${form.errors?.locality ? `${styles.is_invalid_special}` : ''}`}
          id="locality"
          placeholder=""
          onChange={handleChange}
          disabled={isEditionAvailable ? false : true}
          value={form.values.locality}
          title={form.values.locality.length > 17 ? form.values.locality : ''}
        />
      </div>
      <div className={`${styles.input_wrapper_special} py-1`}>
        <label htmlFor="province" className={styles.form_label}>
          Provincia
        </label>
        <input
          {...form.getInputProps('province')}
          type="text"
          className={`${styles.form_control} ${form.errors?.province ? `${styles.is_invalid_special}` : ''}`}
          id="province"
          placeholder=""
          onChange={handleChange}
          disabled={isEditionAvailable ? false : true}
          value={form.values.province}
          title={form.values.province.length > 17 ? form.values.province : ''}
        />
      </div>
    </>
  );
};

export default DestinationInputs;
