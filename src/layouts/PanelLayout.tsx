import { motion } from 'framer-motion';
import React, { FC, PropsWithChildren, useState } from 'react';

import { AppConfig } from '@/config/app';
import { Meta } from '@/layouts/Meta';
import { getFadeInProps } from '@/services/animations.service';
import { Main } from '@/templates/Main';

import NavMenu from '../components/Panel/navMenu/NavMenu';
import styles from './panelLayout.module.sass';
import { useCrossDataStore } from '@/store';
import StoreData from '@/components/Panel/storeData/StoreData';

export const PanelLayout: FC<PropsWithChildren> = ({ children }) => {
  const [isCondensed, setIsCondensed] = useState(true);
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);

  return (
    <Main meta={<Meta title={`${AppConfig.title}`} description="Panel" />}>
      <div className="container-fluid" id={`${styles.panelLayout}`}>
        <div className={`row ${styles.row_grid}`}>
          <div className={`col-12 ${styles.flex_position}`}>
            <NavMenu isCondensed={isCondensed} setIsCondensed={setIsCondensed} />
            <motion.div
              {...getFadeInProps({ delay: 1 })}
              className={`${styles.content_wrapper} ${!isCondensed && styles.isNotCondensed}`}
            >
              {children}
            </motion.div>
            {ecommerceSelected === 'vtex' && <StoreData />}
          </div>
        </div>
      </div>
    </Main>
  );
};
