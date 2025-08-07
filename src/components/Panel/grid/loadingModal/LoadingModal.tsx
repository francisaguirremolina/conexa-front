import React, { FC } from 'react';
import Modal from 'react-bootstrap/Modal';

import styles from './loadingModal.module.sass';

interface Props {
  show: boolean;
  loadingTxt?: string;
}

const LoadingModal: FC<Props> = ({ show, loadingTxt = 'Estamos procesando tu petición...' }) => {
  return (
    <Modal className="rounded-3" id={styles.loading_modal} show={show} backdrop={true} centered size="sm">
      <Modal.Body className={styles.modal_body}>
        <p className={styles.loading_text}>{loadingTxt}</p>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
