import { motion } from 'framer-motion';
import React from 'react';

import { Logos } from '@/components/Logos';
import AccountForm from '@/components/Onboarding/forms/AccountForm';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import Stepper from '@/components/Onboarding/stepper/Stepper';
import { AppConfig } from '@/config/app';
import { Meta } from '@/layouts/Meta';
import { getFadeInProps } from '@/services/animations.service';
import { Main } from '@/templates/Main';
import { useCrossDataStore } from '@/store';

import stylesStepper from '@/components/Onboarding/stepper/stepper.module.sass';
import styles from './account.module.sass';
import { noVtexEcommerce } from '@/services/utils.service';

const Account = () => {
  const { name, id } = useCrossDataStore((state) => state.ecommerce);

  return (
    <Main meta={<Meta title={`${AppConfig.site_name} - ${name}`} description="Account Page" />}>
      <div className="container-fluid" id={`${styles.accountPage}`}>
        <div className="row h-100">
          <div className="col-3 p-3">
            <div className={`${stylesStepper.stepper_container}`}>
              <Logos size="sm" variant="white" />
              <Stepper step={3} />
            </div>
          </div>
          <motion.div {...getFadeInProps({ delay: 1 })} className={`col-9 ${styles.content_wrapper}`}>
            {noVtexEcommerce(id) && (
              <>
                <SectionTitles
                  titleTxt="Números de operativas"
                  subTxt="A continuación, visualizarás tus operativas configuradas en tu cuenta de E-Pak."
                />
                <AccountForm />
              </>
            )}
            {id === 'vtex' && (
              <>
                <SectionTitles
                  titleTxt="Números de operativas"
                  subTxt="Configura al menos 1 operativa. Las vas a encontrar en tu cuenta de E-Pak."
                />
                <AccountForm />
              </>
            )}
          </motion.div>
        </div>
      </div>
    </Main>
  );
};

export default Account;
