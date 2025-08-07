import type { FC, PropsWithChildren } from 'react';
import React from 'react';

import styles from './inputs.module.sass';

interface Props {
  value: string;
  id: string;
  name: string;
  children: PropsWithChildren;
  onChangeFn: (e: any) => void;
  checked: boolean;
  disabled?: boolean;
  extraClassName?: string;
}

const RadioButton: FC<PropsWithChildren<Props>> = ({ id, name, value, children, onChangeFn, checked, disabled = false, extraClassName = "" }) => {
  return (
    <div className={`${styles.radioBtn_wrapper} ${styles[extraClassName]}`}>
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={onChangeFn}
        disabled={disabled}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

export default RadioButton;
