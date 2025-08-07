import { motion } from 'framer-motion';
import React from 'react';

import { Logos } from '@/components/Logos';
import SignUpForm from '@/components/Onboarding/forms/SignUpForm';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import { AppConfig } from '@/config/app';
import { Meta } from '@/layouts/Meta';
import { getFadeInProps } from '@/services/animations.service';
import { Main } from '@/templates/Main';

import styles from './signup.module.sass';
import { useCrossDataStore } from '@/store';

const ClientAuth = () => {
  const { name } = useCrossDataStore((state) => state.ecommerce);
  return (
    <Main meta={<Meta title={`${AppConfig.site_name} - ${name}`} description="Sign up Page" />}>
      <div className="container-fluid" id={`${styles.authPage}`}>
        <div className="row">
          <div className="col-12 p-0 d-flex justify-content-center align-items-center">
            <Logos size="md" />
          </div>
        </div>
        <div className="row">
          <motion.div
            {...getFadeInProps({ delay: 1 })}
            className="col-12 p-0 d-flex flex-column justify-content-center align-items-center"
          >
            <div className={`${styles.text_wrapper}`}>
              <SectionTitles
                titleTxt="Cargá la documentación para pedir el alta en OCA."
                isMain
              >
                <p className={`${styles.section_subtitle}`}>El alta de <span className={styles.bold}>OCA</span> puede demorar hasta 7 días hábiles.</p>
              </SectionTitles>
            </div>
            <SignUpForm />
          </motion.div>
        </div>
      </div>
    </Main>
  );
};

export default ClientAuth;
