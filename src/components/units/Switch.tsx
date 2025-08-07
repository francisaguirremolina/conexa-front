import type { FC } from 'react';
import React from 'react';

import styles from './inputs.module.sass';

interface Props {
  value: string | any;
  id: string;
  checked: boolean;
  labelTxt?: string;
  onChangeFn: (e: any) => void;
  extraClass?: string;
  isDisabled?: boolean;
}

const Switch: FC<Props> = ({ id, value, checked, onChangeFn, labelTxt, extraClass="", isDisabled=false }) => {
  return (
    <div className={`form-check ${styles.form_check} form-switch ${styles.form_switch} ${styles[extraClass]}`}>
      <input
        className={`form-check-input ${styles.form_check_input}`}
        type="checkbox"
        role="switch"
        id={id}
        value={value}
        onChange={onChangeFn}
        checked={checked}
        disabled={isDisabled}
      />
      <label className={`form-check-label ${styles.form_check_label} ${styles.label_bold}`} htmlFor={id}>
        {labelTxt}
      </label>
    </div>
  );
};

export default Switch;
