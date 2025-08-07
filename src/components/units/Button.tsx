import '../../styles/variables.module.sass';

import type { FC } from 'react';
import React from 'react';

import styles from './button.module.sass';

interface Props {
  type: 'submit' | 'button' | any;
  btnTxt: string;
  showSpinner?: boolean;
  isDisabled?: boolean;
  extraClass?: string;
  onClickFn?: (e: any) => void;
  props?: any;
  icon?: any;
  loadingText?: boolean;
}

export const ButtonSmall: FC<Props> = ({ type, btnTxt, showSpinner = false, loadingText = false, isDisabled = false, onClickFn, extraClass = "", icon, ...props }) => {

  return (
    <div className="d-grid gap-2">
      <button
        type={type}
        className={`btn btn-primary ${styles.btn_primary} ${extraClass}`}
        onClick={onClickFn}
        disabled={isDisabled}
        {...props}
      >
        {showSpinner ? (
          <div className={`${loadingText ? '' : 'spinner-grow spinner-grow-sm'}`} role="status">
            <span className={`${!loadingText ? 'visually-hidden' : '' }`} >Cargando...</span>
          </div>
        ) : (
          <>
          {icon ? <> {icon} {btnTxt} </> : btnTxt}
          </>
        )}
      </button>
    </div>
  );
};

export default ButtonSmall;
