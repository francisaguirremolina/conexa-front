import React, {FC} from 'react';

import styles from '../../fulfillModal.module.sass';

interface Props {
  form: any;
  isEditionAvailable: boolean;
  handleChange: (e: any) => void;
}

const RemitterInputs: FC<Props> = ({ form, isEditionAvailable, handleChange }) => {

  return (
    <>
      <div className={`${styles.input_wrapper_special} py-1`}>
        <label htmlFor="firstName" className={styles.form_label}>
          Nombre
        </label>
        <input
          {...form.getInputProps('firstName')}
          type="text"
          className={`${styles.form_control} ${form.errors?.firstName ? `${styles.is_invalid_special}` : ''}`}
          id="firstName"
          placeholder=""
          onChange={handleChange}
          disabled={!isEditionAvailable}
          value={form.values.firstName}
        />
      </div>
      <div className={`${styles.input_wrapper_special} py-1`}>
        <label htmlFor="lastName" className={styles.form_label}>
          Apellido
        </label>
        <input
          {...form.getInputProps('lastName')}
          type="text"
          className={`${styles.form_control} ${form.errors?.lastName ? `${styles.is_invalid_special}` : ''}`}
          id="lastName"
          placeholder=""
          onChange={handleChange}
          disabled={!isEditionAvailable}
          value={form.values.lastName}
        />
      </div>
      <div className={`${styles.input_wrapper_special} py-1`}>
        <label htmlFor="cuil" className={styles.form_label}>
          CUIL / DNI
        </label>
        <input
          {...form.getInputProps('cuil')}
          type="text"
          className={`${styles.form_control} ${form.errors?.cuil ? `${styles.is_invalid_special}` : ''}`}
          id="cuil"
          placeholder=""
          onChange={handleChange}
          disabled={!isEditionAvailable}
          value={form.values.cuil}
        />
      </div>
    </>
  );
};

export default RemitterInputs;
