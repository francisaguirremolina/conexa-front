import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { extractEcommerceFromUrl } from '@/lib/extractEcommerce';
import { Logos } from '@/components/Logos';
import { panelPagesList, panelVtexPagesList, panelWooPrestaPagesList } from '@/constants';


import styles from './navMenu.module.sass';
import NavItem from './NavItem';
import { useCrossDataStore } from '@/store';

const NavMenu = ({isCondensed, setIsCondensed}) => {
  
  const [ecommerceSelected, setEcommerceSelected] = useState('');
  useEffect(() => {
    extractEcommerceFromUrl(setEcommerceSelected);
  }, [ecommerceSelected]);

  const { ecommerce } = useCrossDataStore();

  return (
    <div
      className={`${styles.main_nav} ${isCondensed ? styles.condensed : ''}`}
      onMouseOver={() => setIsCondensed(false)}
      onMouseOut={() => setIsCondensed(true)}
    >
      {isCondensed ? (
        <Image src="/assets/images/logos/oca-isologo.png" alt="oca logo" width={32} height={23} />
      ) : (
        <Logos size="sm" variant="white" delaySec={0.1} />
      )}

      {ecommerceSelected && (
        <div className={`${styles.panel_navMenu}`}>
          {!['woocommerce', 'prestashop', 'vtex'].includes(ecommerceSelected) &&
            panelPagesList.map((navItem, index) => (
              <NavItem props={navItem} key={index} isCondensed={isCondensed} ecommerce={ecommerce.id}/>
            ))}
          {ecommerceSelected === 'vtex' &&
            panelVtexPagesList.map((navItem, index) => (
              <NavItem props={navItem} key={index} isCondensed={isCondensed} ecommerce={ecommerce.id}/>
            ))}
          {['woocommerce', 'prestashop'].includes(ecommerceSelected) &&
            panelWooPrestaPagesList.map((navItem, index) => (
              <NavItem props={navItem} key={index} isCondensed={isCondensed} ecommerce={ecommerce.id}/>
            ))}
        </div>
      )}
    </div>
  );
};

export default NavMenu;
