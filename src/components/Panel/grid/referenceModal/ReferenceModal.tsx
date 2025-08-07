import React, { FC } from 'react';
import Image from 'next/image';
import { panelStatusOptions } from '@/constants';
import { colorSetter } from '@/services/grid.service';
import Modal from 'react-bootstrap/Modal';
import { FiInfo } from 'react-icons/fi';

import styles from './referenceModal.module.sass';

interface Props{
  show: boolean;
  handleClose: () => void;
}

const ReferenceModal: FC<Props> = ({ show, handleClose }) => {
  return (
    <Modal
      className="rounded-3"
      id={styles.reference_modal}
      show={show}
      backdrop={true}
      onHide={handleClose}
      centered
      // @ts-ignore
      size="md"
      scrollable
    >
      <Modal.Header closeButton className={`${styles.modal_header} border-0`}>
        <p className={styles.reference_title}>
          <FiInfo size={14} /> Referencias
        </p>
      </Modal.Header>
      <Modal.Body className={styles.modal_body}>
        <ul className={styles.status_list}>
          {panelStatusOptions.map((itemInfo, index) => (
            <li className={styles.status_item} key={`status ${index}`}>
              <div className={styles.img_wrapper}>
                <Image src={colorSetter(itemInfo.value)} alt={`${itemInfo.name}`}></Image>
              </div>
              <div className={styles.status_text_wrapper}>
                <p>{itemInfo.name}</p>
                <p className={styles.secondary}>{itemInfo.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default ReferenceModal;
