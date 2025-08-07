import { motion } from 'framer-motion';
import React from 'react';

import { Logos } from '@/components/Logos';

import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import Stepper from '@/components/Onboarding/stepper/Stepper';
import { AppConfig } from '@/config/app';
import { Meta } from '@/layouts/Meta';
import { getFadeInProps } from '@/services/animations.service';
import { Main } from '@/templates/Main';

import stylesStepper from '@/components/Onboarding/stepper/stepper.module.sass';
import styles from './create.module.sass';
// import RemitterForm from '@/components/Onboarding/forms/RemitterForm';

const Create = () => {
  return (
    <Main meta={<Meta title={`${AppConfig.site_name} - Vtex`} description="Create Page" />}>
      <div className="container-fluid" id={`${styles.createPage}`}>
        <div className="row h-100">
          <div className="col-3 p-3">
            <div className={`${stylesStepper.stepper_container}`}>
              <Logos size="sm" variant="white" />
              <Stepper step={2} />
            </div>
          </div>
          <motion.div {...getFadeInProps({ delay: 1 })} className={`col-9 ${styles.content_wrapper}`}>
            <SectionTitles
              titleTxt="Crear muelle"
            />
            {/* <RemitterForm /> */}
          </motion.div>
        </div>
      </div>
    </Main>
  );
};

export default Create;
