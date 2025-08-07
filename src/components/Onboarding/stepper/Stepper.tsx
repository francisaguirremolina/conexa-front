import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import React from 'react';

import { getFadeInProps } from '@/services/animations.service';

import styles from './stepper.module.sass';
import { extractEcommerceFromUrl } from '@/lib/extractEcommerce';

const pages = ['Remitente', 'Tus despachos', 'Tu cuenta'];
const pagesVtex = ['Muelles', 'Tus despachos', 'Tu cuenta'];
const pagesWooPresta = ['Remitente', 'Tus despachos', 'Tu cuenta', 'Tu paquete', 'Tipo de servicio'];
interface PropsNav {
  step: number;
  page: string;
  index: number;
}

const NavListItem: FC<PropsNav> = ({ step, page, index }) => {
  const setStepClass = (i: number, stepNum: number) => {
    if (i + 1 === stepNum) {
      return 'selected';
    }
    if (i + 1 < stepNum) {
      return 'visited';
    }
    return '';
  };

  return (
    <li key={index} className={`${styles[setStepClass(index, step)]}`}>
      <div className={`${styles.circle}`}>{index + 1}</div>
      <span>{page}</span>
    </li>
  );
};

interface PropsStepper {
  step: number;
}

const Stepper: FC<PropsStepper> = ({ step }) => {
  
  const [ecommerceSelected, setEcommerceSelected] = useState('');
  useEffect(() => {
    extractEcommerceFromUrl(setEcommerceSelected);
  }, [ecommerceSelected]);
  
  return (
    <>
      {ecommerceSelected && (
        <motion.div {...getFadeInProps({ delay: 0.8 })} className={`${styles.onboarding_nav}`}>
          <ul className={`${styles.pages_titles_list}`}>

            {ecommerceSelected === 'vtex' &&
              pagesVtex.map((page, index) => <NavListItem key={index} step={step} page={page} index={index} />)}

            {!['woocommerce', 'prestashop', 'vtex'].includes(ecommerceSelected) &&
              pages.map((page, index) => <NavListItem key={index} step={step} page={page} index={index} />)}

            {['woocommerce', 'prestashop'].includes(ecommerceSelected) && pagesWooPresta.map((page, index) => <NavListItem key={index} step={step} page={page} index={index} />)}

          </ul>
        </motion.div>
      )}
    </>
  );
};

export default Stepper;
