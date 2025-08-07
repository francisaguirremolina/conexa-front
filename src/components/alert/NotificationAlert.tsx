import { motion } from 'framer-motion';
import React from 'react';
import { IoAlertCircleOutline, IoCheckmarkCircleOutline, IoClose } from 'react-icons/io5';

import { getFadeInProps } from '@/services/animations.service';

import styles from './notificationAlert.module.sass';

export interface NotificationAlertProps {
  type: 'success' | 'error' | string;
  length: number;
  message: string | string[];
  onClose: (e: any) => void;
}

export const NotificationAlert: React.FC<NotificationAlertProps> = ({ type, length, message, onClose }) => {
  return (
    <motion.div
      {...getFadeInProps()}
      id={`${styles.notificationAlert}`}
      className={`${styles[type]} ${styles.external_layout}`}
    >
      <div className={`${styles.internal_layout}`}>
        <div className={`${styles.icon_wrapper}`}>
          {type === 'success' ? (
            <IoCheckmarkCircleOutline size={20} className={`${styles.successful}`} />
          ) : type === 'error' ? (
            <IoAlertCircleOutline size={20} className={`${styles.danger}`} />
          ) : (
            <IoAlertCircleOutline size={20} className={`${styles.warning}`} />
          )}
        </div>
        {Array.isArray(message) ? (
          message.map((error, i) => (
            <span key={i} className={`${styles[type]}`}>
              {error}
            </span>
          ))
        ) : (
          <span className={`${styles[type]} ${length > 1 && styles.textSpace}`}>{message}</span>
        )}
      </div>
      <button type="button" onClick={onClose}>
        <IoClose size={20} className={`${styles[type]}`} />
      </button>
    </motion.div>
  );
};
