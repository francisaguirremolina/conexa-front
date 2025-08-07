import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import styles from './inputs.module.sass';
import { LuEye, LuEyeOff } from "react-icons/lu";

interface Props {
  customValue: string | number | any;
  id: string;
  type: "text" | "number" | any;
  placeholder?: string;
  labelTxt?: string;
  onChangeFn: (e: any) => void;
  resultValidation?: string;
  errorTxt?: string | any;
  isDisabled?: boolean;
  min?: number;
  max?: number;
  extraClass?: string;
}

const InputsSimple: FC<Props> = ({
  customValue,
  id,
  type,
  placeholder,
  labelTxt,
  onChangeFn,
  resultValidation = "",
  errorTxt = "",
  isDisabled = false,
  min = 1,
  max,
  extraClass,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (customValue) {
      setIsFocused(true);
    }
  }, []);

  const blurBehaviour = () => {
    if (!customValue) {
      setIsFocused(false);
    }
  };

  const [inputType, setInputType] = useState(type);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
    setInputType(prevType => prevType === 'password' ? 'text' : 'password'); // Cambiar el tipo de entrada
  };
  
  return (
    <div className="inputSimple-main-container">
      <div className={`${styles.input_wrapper} ${extraClass ? extraClass : ''}`}>
        <label htmlFor={id} className={`form-label ${styles.form_label} ${isFocused || customValue ? `${styles.moveUp}` : `${styles.moveDown}`} ${isDisabled && styles.label_disabled}`}>
          {labelTxt}
        </label>
        {type === 'number' ? (
          <input
            value={customValue}
            type="number"
            className={`form-control ${styles.remove_arrow} ${resultValidation && styles[resultValidation]}`}
            id={id}
            placeholder={placeholder}
            onChange={onChangeFn}
            onBlur={() => blurBehaviour()}
            onFocus={() => setIsFocused(true)}
            min={min}
            max={max}
            step="0.01"
            disabled={isDisabled}
          />
        ) : (
          <div className='absolute'>
            <input
            type={inputType}
            className={`form-control `}
            id={id}
            placeholder={placeholder}
            onChange={onChangeFn}
            value={customValue}
            onBlur={() => blurBehaviour()}
            onFocus={() => setIsFocused(true)}
            disabled={isDisabled}
          />
          {type === 'password' && (
          <button
            id='btnShowPassword'
            type="button"
            className={`mt-0 border-0 position-absolute top-50 end-0 translate-middle-y bg-transparent`}
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <LuEyeOff /> : <LuEye />}
          </button>
          )}   
          </div> 
        )}
      </div>
      <span className={`${styles.invalid_msg}`}>{errorTxt}</span>
    </div>
  );
};

export default InputsSimple;
