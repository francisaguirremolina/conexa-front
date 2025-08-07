import { motion } from 'framer-motion';
import React from 'react';

import { Logos } from '@/components/Logos';
import DispatchForm from '@/components/Onboarding/forms/DispatchForm';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import Stepper from '@/components/Onboarding/stepper/Stepper';
import { AppConfig } from '@/config/app';
import { Meta } from '@/layouts/Meta';
import { getFadeInProps } from '@/services/animations.service';
import { Main } from '@/templates/Main';

import stylesStepper from '@/components/Onboarding/stepper/stepper.module.sass';
import styles from './dispatch.module.sass';
import { useCrossDataStore } from '@/store';

const Dispatch = () => {
  const { name, id: ecommerceSelected } = useCrossDataStore((state) => state.ecommerce);  
  return (
    <Main meta={<Meta title={`${AppConfig.site_name} - ${name}`} description="Dispatch Page" />}>
      <div className="container-fluid" id={`${styles.dispatchPage}`}>
        <div className="row h-100">
          <div className="col-3 p-3">
            <div className={`${stylesStepper.stepper_container}`}>
              <Logos size="sm" variant="white" />
              <Stepper step={2} />
            </div>
          </div>
          <motion.div {...getFadeInProps({ delay: 1 })} className={`col-9 ${styles.content_wrapper}`}>
            <SectionTitles
              titleTxt="Configura tus despachos"
              subTxt={ecommerceSelected === 'vtex' ? 'Recuerda que al editar la configuración de un muelle, esta modificación solo impactará en las nuevas órdenes. Las órdenes existentes asociadas a ese muelle mantendrán la configuración anterior.' :"Recuerda que podrás modificar estos datos antes de crear tus etiquetas."}
            />
            <DispatchForm />
          </motion.div>
        </div>
      </div>
    </Main>
  );
};

export default Dispatch;
