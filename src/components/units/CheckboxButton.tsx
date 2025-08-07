import type { FC, PropsWithChildren } from 'react';
import React from 'react';

import styles from './inputs.module.sass';

interface Props {
  value: string;
  id: string;
  children?: PropsWithChildren;
  onChangeFn: (e: any) => void;
  checked: boolean;
  disabled?: boolean;
  extraClassName?: string;
  extraLabelClass?: string;
}

const CheckboxButton: FC<PropsWithChildren<Props>> = ({ id, value, onChangeFn, children, checked, disabled = false, extraClassName = "", extraLabelClass }) => {

  return (
      <div className={`${styles.form_check_input} ${styles[extraClassName]} ${extraClassName}`}>
          <input
              type="checkbox"
              id={id}
              value={value}
              checked={checked}
              onChange={onChangeFn}
              disabled={disabled}
          />
          <label htmlFor={id} className={extraLabelClass}>
              {children}
          </label>
      </div>
  )
}

export default CheckboxButton