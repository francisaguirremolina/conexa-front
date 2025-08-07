import { motion } from 'framer-motion';
import React from 'react';

import { Logos } from '@/components/Logos';
import AuthEcommerceForm from '@/components/Onboarding/forms/AuthEcommerceForm';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import { AppConfig } from '@/config/app';
import { Meta } from '@/layouts/Meta';
import { getFadeInProps } from '@/services/animations.service';
import { Main } from '@/templates/Main';

import styles from './authEcommerce.module.sass';
import { useCrossDataStore } from '@/store';

const AuthEcommerce = () => {
  const { name } = useCrossDataStore((state) => state.ecommerce);
  return (
    <Main meta={<Meta title={`${AppConfig.site_name} - ${name}`} description="Sign in Page" />}>
      <div className="container-fluid" id={`${styles.authEcommercePage}`}>
        <div className="row">
          <div className="col-12 p-0 d-flex justify-content-center align-items-center">
            <Logos size="lg" />
          </div>
        </div>
        <div className="row">
          <motion.div
            {...getFadeInProps({ delay: 1 })}
            className="col-12 p-0 d-flex flex-column justify-content-center align-items-center"
          >
            <SectionTitles titleTxt="Iniciá sesión con tus credenciales de VTEX" isMain isCentered />
            <AuthEcommerceForm />
          </motion.div>
        </div>
      </div>
    </Main>
  );
};

export default AuthEcommerce;
