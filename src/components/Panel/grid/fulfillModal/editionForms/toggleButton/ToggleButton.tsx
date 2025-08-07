import React, { FC } from 'react';
import ButtonSmall from '@/components/units/Button';

import styles from '../../fulfillModal.module.sass';
import styleBtn from '../../../../../units/button.module.sass';

interface Props{
  isEditionAvailable: boolean; 
  setIsEditionAvailable: (e: any) => void;
  blockTitle: string;
  submit?: (e: any) => void;
  hideEditBtn?: boolean;
  disableButton?: boolean;
}

const ToggleButton: FC<Props> = ({ isEditionAvailable = false, setIsEditionAvailable, blockTitle, submit, hideEditBtn, disableButton = false }) => {
  
  return (
    <div className={styles.with_btn}>
      <h2 className={styles.fulfill_body_mainTitle}>{blockTitle}</h2>
      {!hideEditBtn && (
        <>
          {isEditionAvailable ? (
            <ButtonSmall
              type="button"
              btnTxt="Guardar"
              onClickFn={submit}
              showSpinner={false}
              isDisabled={disableButton}
              extraClass={`${styleBtn.btn_link} p-0 ${disableButton && styleBtn.disabled}`}
            />
          ) : (
            <ButtonSmall
              type="button"
              btnTxt="Editar"
              onClickFn={() => setIsEditionAvailable(true)}
              showSpinner={false}
              isDisabled={false}
              extraClass={`${styleBtn.btn_link} p-0`}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ToggleButton;
