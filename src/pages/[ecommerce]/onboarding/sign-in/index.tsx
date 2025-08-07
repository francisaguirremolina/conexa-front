import { motion } from 'framer-motion';
import React from 'react';
import Link from 'next/link';

import { Logos } from '@/components/Logos';
import SignInForm from '@/components/Onboarding/forms/SignInForm';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import { AppConfig } from '@/config/app';
import { Meta } from '@/layouts/Meta';
import { getFadeInProps } from '@/services/animations.service';
import { Main } from '@/templates/Main';
import { useCrossDataStore } from '@/store';

import styleBtn from '../../../../components/units/button.module.sass'
import styles from './signin.module.sass';


const Login = () => {
  const { name, id } = useCrossDataStore((state) => state.ecommerce);
  
  return (
    <Main meta={<Meta title={`${AppConfig.site_name} - ${name}`} description="Sign in Page" />}>
      <div className="container-fluid" id={`${styles.loginPage}`}>
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
            <SectionTitles titleTxt={id === "vtex" ? "Iniciá sesión con tu cuenta de OCA" : "Iniciá sesión"} isMain isCentered />
            <SignInForm />
            {
              id === 'vtex' &&
              <Link href="https://b24-6nulzq.bitrix24.site/crm_form_ulkvg/">
                <a className={`${styleBtn.btn_link} mt-3`}>
                  Si aún no tienes, Crea tu cuenta en OCA
                </a>
              </Link>
            }
          </motion.div>
        </div>
      </div>
    </Main>
  );
};

export default Login;
