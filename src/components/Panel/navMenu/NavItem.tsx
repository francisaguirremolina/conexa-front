import React from 'react'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getFadeInProps } from '@/services/animations.service';
import router from 'next/router';
import Image from 'next/image';

import styles from './navMenu.module.sass';

const props = ({ props, isCondensed, ecommerce }) => {
  return (
    <motion.div {...getFadeInProps({ delay: 0.1 })}>
      <Link href={`/${ecommerce}/panel/${props.routeInfo}`} passHref className={isCondensed ? styles.condensed : ''}>
        <a className={router.asPath.includes(props.routeInfo) ? `${styles.active}` : ''}>
          <Image
            src={router.asPath.includes(props.routeInfo) ? props.iconRouteActive : props.iconRoute}
            alt={props.title}
            width={props.iconWidth}
            height={props.iconHeight}
          />
          {isCondensed ? (
            ''
          ) : (
            <p className="m-0 ms-3" style={{ overflow: 'visible', width: '200px' }}>
              {props.title}
            </p>
          )}
        </a>
      </Link>
    </motion.div>
  );
};

export default props