import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import styles from './inputs.module.sass';
import { useCrossDataStore } from '@/store';

interface Options {
  accountType?: string;
  accountNumber?: string | number;
  name: string;
  value: string | number;
}

interface Props {
  value: string;
  id: string;
  previouslySelected?: string;
  labelTxt?: string;
  onChangeFn: (e: any) => void;
  resultValidation?: string;
  arrayList: Options[];
  placeholder?: string;
  enableFirstOption?: boolean;
  isRemitter?: boolean;
}

export const InputsSelect: FC<Props> = ({
  isRemitter,
  id,
  value,
  labelTxt,
  onChangeFn,
  arrayList,
  previouslySelected,
  resultValidation = '',
  placeholder = '',
  enableFirstOption,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);

  useEffect(() => {
    if (value || previouslySelected) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  }, []);

  const blurBehaviour = () => {
    if (!value) {
      setIsFocused(false);
    } else {
      setIsFocused(true);
    }
  };
  const isVtex = ecommerceSelected === 'vtex'
  return (
    <div className={`${styles.select_wrapper}`}>
      <label
        htmlFor={id}
        className={`form-label ${isRemitter && styles.remitter} ${styles.form_label} ${styles.select_label} ${
          isFocused || previouslySelected ? styles.moveUp : styles.moveDown
        }`}
        style={{ pointerEvents: 'none' }}
      >
        {labelTxt}
      </label>

      <select
        className={`form-select ${styles.form_select} ${styles[resultValidation]}`}
        aria-label={labelTxt}
        id={id}
        onChange={onChangeFn}
        onBlur={() => blurBehaviour()}
        onFocus={() => setIsFocused(true)}
      >
        <option selected className={`form-select-option ${styles.form_select_option}`} disabled={!enableFirstOption}>
          {arrayList.find((item) => item.value === previouslySelected)?.name || placeholder}
        </option>

        {arrayList.map((item, index) => (
          <option
            key={`${index}`}
            className={`form-select-option ${styles.form_select_option}`}
            value={isVtex ? item.accountType || item.value : item.value}
            selected={
              isVtex ? (item.accountType || item.value) === previouslySelected : item.value === previouslySelected
            }
          >
            {isVtex ? item.accountType || item.name : item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const SizePerPageInputsSelect: FC<Props> = ({
  isRemitter,
  id,
  value,
  labelTxt,
  onChangeFn,
  arrayList,
  previouslySelected,
  resultValidation = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);
  useEffect(() => {
    if (value || previouslySelected) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  }, []);

  const blurBehaviour = () => {
    if (!value) {
      setIsFocused(false);
    } else {
      setIsFocused(true);
    }
  };

  const isVtex = ecommerceSelected === 'vtex'
  return (
    <div className={`${styles.select_wrapper}`}>
      <label
        htmlFor={id}
        className={`form-label ${isRemitter && styles.remitter} ${styles.form_label} ${styles.select_label} ${
          isFocused || previouslySelected ? styles.moveUp : styles.moveDown
        }`}
        style={{ pointerEvents: 'none' }}
      >
        {labelTxt}
      </label>

      <select
        className={`form-select ${styles.form_select} ${styles[resultValidation]}`}
        aria-label={labelTxt}
        id={id}
        onChange={onChangeFn}
        onBlur={() => blurBehaviour()}
        onFocus={() => setIsFocused(true)}
      >
        {arrayList.map((item, index) => (
          <option
            key={`${index}`}
            className={`form-select-option ${styles.form_select_option}`}
            value={isVtex ? item.accountType || item.value : item.value}
            selected={
              isVtex ? (item.accountType || item.value) === previouslySelected : item.value === previouslySelected
            }
          >
            {isVtex ? item.accountType || item.name : item.name}
          </option>
        ))}
      </select>
    </div>
  );
};
