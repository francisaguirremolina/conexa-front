/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { getFadeInProps } from '@/services/animations.service';
import { extractEcommerceFromUrl } from '@/lib/extractEcommerce';

import styles from './logos.module.sass';

interface Props {
  size?: string;
  variant?: string;
  delaySec?: number;
  ecommerce?: string;
}

export const Logos: FC<Props> = ({ size = 'md', variant = 'black', delaySec = 0.8, ecommerce }) => {
  const [ecommerceSelected, setEcommerceSelected] = useState(ecommerce || '');
  useEffect(() => {
    extractEcommerceFromUrl(setEcommerceSelected);
  }, [ecommerceSelected]);

  return (
    <>
      {ecommerceSelected && (
        <motion.div id={styles.logos} {...getFadeInProps({ delay: delaySec })} className={`${styles[size]}`}>
          <img src={`/assets/images/logos/logo-duo-${variant}-${ecommerceSelected}.svg`} alt="logos" />
        </motion.div>
      )}
    </>
  );
};
