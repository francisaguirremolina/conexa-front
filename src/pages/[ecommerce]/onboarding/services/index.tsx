import { motion } from 'framer-motion';
import React from 'react'

import { Logos } from '@/components/Logos';
import ServicesForm from '@/components/Onboarding/forms/ServicesForm';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import Stepper from '@/components/Onboarding/stepper/Stepper';
import { AppConfig } from '@/config/app';
import { Meta } from '@/layouts/Meta';
import { getFadeInProps } from '@/services/animations.service';
import { Main } from '@/templates/Main';

import stylesStepper from '@/components/Onboarding/stepper/stepper.module.sass';
import styles from './services.module.sass';
import { useCrossDataStore } from '@/store';


const Services = () => {
  const { name } = useCrossDataStore((state) => state.ecommerce);
  return (
    <Main meta={<Meta title={`${AppConfig.site_name} - ${name}`} description="Services Page" />}>
      <div className="container-fluid" id={`${styles.servicesPage}`}>
        <div className="row h-100">
          <div className="col-3 p-3">
            <div className={`${stylesStepper.stepper_container}`}>
              <Logos size="sm" variant="white" />
              <Stepper step={5} />
            </div>
          </div>
          <motion.div {...getFadeInProps({ delay: 1 })} className={`col-9 ${styles.content_wrapper}`}>
            <SectionTitles
              titleTxt="Tipo de servicio"
              subTxt="Selecciona el tipo de servicio que deseas ofrecerle a tus clientes."
            />
            <ServicesForm />
          </motion.div>
        </div>
      </div>
    </Main>
  )
}

export default Services;