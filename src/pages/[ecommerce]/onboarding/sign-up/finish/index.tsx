import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useCrossDataStore } from '@/store';

import { Logos } from '@/components/Logos';
import { ButtonSmall } from '@/components/units/Button';
import { AppConfig } from '@/config/app';
import { Meta } from '@/layouts/Meta';
import { getFadeInProps } from '@/services/animations.service';
import { Main } from '@/templates/Main';

import styles from './finish.module.sass';
import { noVtexEcommerce } from '@/services/utils.service';

const AuthFinish = () => {
  const router = useRouter();
  const { name, id } = useCrossDataStore((state) => state.ecommerce);

  return (
    <Main meta={<Meta title={`${AppConfig.site_name} - ${name}`} description="Finish Sign up Page" />}>
      <div className="container-fluid" id={`${styles.authFinishPage}`}>
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
            <div className={`${styles.illustration_wrapper}`}>
              <Image src={'/assets/images/register-complete.png'} alt="registration complete" width={83} height={80} />
            </div>
            <h1>¡Ya solicitaste tu alta!</h1>
            <p className={`${styles.intro}`}>
              Un comercial de <span className={styles.bold}>OCA</span> se contactará con vos dentro de las próximas 24 h hábiles y el alta podrás tenerla
              dentro de 48 h hábiles.
            </p>
            <ButtonSmall
              type="button"
              btnTxt="Volver al inicio"
              onClickFn={() => {
                if(noVtexEcommerce(id)) router.push(`/${id}/welcome`);
                if(id === 'vtex') router.push(`/${id}/onboarding/sign-in`);
              }}
              showSpinner={false}
              isDisabled={false}
            />
          </motion.div>
        </div>
      </div>
    </Main>
  );
};

export default AuthFinish;
