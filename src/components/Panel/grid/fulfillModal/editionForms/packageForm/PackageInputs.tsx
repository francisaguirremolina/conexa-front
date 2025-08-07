import React, {FC} from 'react';

import styles from '../../fulfillModal.module.sass';

interface Props {
  form: any;
  handleChange: (e: any) => void;
  isEditionAvailable: boolean;
}

const PackageInputs: FC<Props> = ({ form, isEditionAvailable, handleChange }) => {

  return (
    <>
      <div className={`${styles.input_wrapper_special} py-1`}>
        <label htmlFor="width" className={styles.form_label}>
          Ancho (cm)
        </label>
        <input
          {...form.getInputProps('width')}
          className={`${styles.form_control} ${styles.remove_arrow} ${form.errors?.width ? `${styles.is_invalid_special}` : ''}`}
          id="width"
          type="number"
          placeholder="00,00"
          onChange={handleChange}
          disabled={isEditionAvailable ? false : true}
          value={form.values.width}
        />
      </div>
      <div className={`${styles.input_wrapper_special} py-1`}>
        <label htmlFor="height" className={styles.form_label}>
          Alto (cm)
        </label>
        <input
          {...form.getInputProps('height')}
          className={`${styles.form_control} ${styles.remove_arrow} ${form.errors?.height ? `${styles.is_invalid_special}` : ''}`}
          id="height"
          type="number"
          placeholder="00,00"
          onChange={handleChange}
          disabled={isEditionAvailable ? false : true}
          value={form.values.height}
        />
      </div>
      <div className={`${styles.input_wrapper_special} py-1`}>
        <label htmlFor="length" className={styles.form_label}>
          Largo (cm)
        </label>
        <input
          {...form.getInputProps('length')}
          className={`${styles.form_control} ${styles.remove_arrow} ${form.errors?.length ? `${styles.is_invalid_special}` : ''}`}
          id="length"
          type="number"
          placeholder="00,00"
          onChange={handleChange}
          disabled={isEditionAvailable ? false : true}
          value={form.values.length}
        />
      </div>
      <div className={`${styles.input_wrapper_special} py-1`}>
        <label htmlFor="bulks" className={styles.form_label}>
          Bultos
        </label>
        <input
          {...form.getInputProps('bulks')}
          className={`${styles.form_control} ${styles.remove_arrow} ${form.errors?.bulks ? `${styles.is_invalid_special}` : ''}`}
          id="bulks"
          type="number"
          placeholder=""
          onChange={handleChange}
          disabled={isEditionAvailable ? false : true}
          value={form.values.bulks}
        />
      </div>
    </>
  );
};

export default PackageInputs;
