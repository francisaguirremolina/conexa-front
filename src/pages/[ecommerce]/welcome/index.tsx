import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useCrossDataStore } from '@/store';

import { Logos } from '@/components/Logos';
import { AppConfig } from '@/config/app';
import { Meta } from '@/layouts/Meta';
import { getFadeInProps } from '@/services/animations.service';
import { Main } from '@/templates/Main';

import { ButtonSmall } from '../../../components/units/Button';
import styleBtn from '../../../components/units/button.module.sass';
import styles from './welcome.module.sass';
import { extractAndSaveEcommerce } from '@/lib/extractEcommerce';
import SignInVtexForm from '@/components/Onboarding/forms/SignInVtexForm';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import { noVtexEcommerce } from '@/services/utils.service';

const Welcome = () => {
  const router = useRouter();
  
  const redirect = () => {
    if(id !== 'tiendanube') router.push(`/${id}/onboarding/sign-up`);
    else window.open('https://b24-6nulzq.bitrix24.site/crm_form_ulkvg/', '_blank') ;
  }

  useEffect(() => {
    extractAndSaveEcommerce();
    const userId = new URLSearchParams(window.location.search).get('userId');
    if (userId) {
      Cookies.set('userId', userId, { expires: 365 });
    }
  }, []);

  const { name, id } = useCrossDataStore((state) => state.ecommerce);

  return (
    <Main meta={<Meta title={`${AppConfig.site_name} - ${name}`} description="Welcome Page" />}>
      <div className="container-fluid" id={`${styles.welcomePage}`}>
        <div className="row">
          <div className="col-12 p-0 d-flex justify-content-center align-items-center">
            <Logos size="lg" ecommerce={id} />
          </div>
        </div>
        <div className="row">
          {noVtexEcommerce(id) && (
            <motion.div
              {...getFadeInProps({ delay: 1 })}
              className="col-12 p-0 d-flex flex-column justify-content-center align-items-center"
            >
              <p className={`${styles.intro}`}>
                ¡Gracias por comenzar a usar la aplicación de <span className={`${styles.bold}`}>OCA</span> para{' '}
                <span className={`${styles.bold}`}>{name}</span>! Para continuar, es necesario crear o tener una
                cuenta en <span className={`${styles.bold}`}>OCA</span>.
              </p>
              <ButtonSmall
                type="button"
                btnTxt="Crear cuenta en OCA"
                onClickFn={redirect}
                showSpinner={false}
                isDisabled={false}
              />
              <Link href={`/${id}/onboarding/sign-in`}>
                <a className={`${styleBtn.btn_link}`}>Iniciar sesión en OCA</a>
              </Link>
            </motion.div>
          )}

          {id === 'vtex' && (
            <motion.div
              {...getFadeInProps({ delay: 1 })}
              className="col-12 p-0 d-flex flex-column justify-content-center align-items-center"
            >
              <div className={`${styles.intro_form}`}>
                <SectionTitles titleTxt="Iniciá sesión" isMain />
              </div>
              <SignInVtexForm />
              <Link href={`/${id}/onboarding/auth-ecommerce`}>
                <a className={`${styleBtn.btn_link}`}>Crear cuenta por primera vez</a>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </Main>
  );
};

export default Welcome;
