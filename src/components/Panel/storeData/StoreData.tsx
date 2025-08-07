import { getFadeInProps } from '@/services/animations.service';
import { useOnboardingStore } from '@/store';
import { motion } from 'framer-motion';
import React from 'react';

import styles from './storeData.module.sass';
import ButtonSmall from '@/components/units/Button';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const StoreData = () => {
  const storeName = useOnboardingStore((state) => state.storeUrl).replace('https://', '');
  const router = useRouter();

  const clearCookiesAndLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userId');
    router.push('/vtex/welcome');
  };

  return (
    <motion.div {...getFadeInProps({ delay: 1 })} className={`d-flex position-absolute gap-3 ${styles.store_data}`}>
      <motion.p className="mb-0">{storeName}</motion.p>
      <ButtonSmall extraClass="px-2 py-1 lh-1" btnTxt="cerrar sesión" type="button" onClickFn={clearCookiesAndLogout} />
    </motion.div>
  );
};

export default StoreData;
