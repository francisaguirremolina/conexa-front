import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import { FiUpload } from 'react-icons/fi';

import styles from '../signUpForm.module.sass';
import styleBtn from '../../../units/button.module.sass';

interface Props {
  inputId: string;
  handleUploadChange: (e: any) => void;
  fileValue: any;
}

const AttachFile: FC<PropsWithChildren<Props>> = ({ children, inputId, handleUploadChange, fileValue }) => {
  return (
    <>
      <span>{children}</span>
      <div className={`${styleBtn.btn_upload_wrapper} mt-2`}>
        <input
          type="file"
          id={inputId}
          name={inputId}
          className={`${styleBtn.btn_upload}`}
          onChange={handleUploadChange}
          accept="application/pdf"
        />
        <label htmlFor={inputId} className={`${styleBtn.btn_primary}`}>
          <FiUpload size={18} className="me-2" /> Adjuntar archivo
        </label>
        {fileValue?.name ? (
          <span className={`${styleBtn.upload_info} ms-2`}>{fileValue?.name}</span>
        ) : (
          <span className={styles.file_conditions}>(Formato pdf y menor a 10mb)</span>
        )}
      </div>
    </>
  );
};

export default AttachFile;
