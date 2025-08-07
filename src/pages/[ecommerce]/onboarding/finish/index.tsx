import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';

import { Logos } from '@/components/Logos';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import Stepper from '@/components/Onboarding/stepper/Stepper';
import { ButtonSmall } from '@/components/units/Button';
import { AppConfig } from '@/config/app';
import { Meta } from '@/layouts/Meta';
import { getFadeInProps } from '@/services/animations.service';
import { extractInfoFromCookies } from '@/services/utils.service';
import { useCrossDataStore, useOnboardingStore } from '@/store';
import { Main } from '@/templates/Main';

import stylesStepper from '@/components/Onboarding/stepper/stepper.module.sass';
import styleBtn from '@/components/units/button.module.sass';
import styles from './finish.module.sass';
import Link from 'next/link';

const Finish = () => {
  const router = useRouter();
  const { name, id } = useCrossDataStore((state) => state.ecommerce);
  const storeUrl = useOnboardingStore((state) => state.storeUrl);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const value: any = extractInfoFromCookies('userId');
    setUserId(value);
  }, [])

  const vtexRedirect = () => {
    Cookies.remove('userId');
    router.push(`/${id}/welcome`);
  }

  return (
    <Main meta={<Meta title={`${AppConfig.site_name} - ${name}`} description="Finish Onboarding Page" />}>
      <div className="container-fluid" id={`${styles.finishPage}`}>
        <div className="row h-100">
          <div className="col-3 p-3">
            <div className={`${stylesStepper.stepper_container}`}>
              <Logos size="sm" variant="white" />
              <Stepper step={5} />
            </div>
          </div>
          <motion.div {...getFadeInProps({ delay: 1 })} className={`col-9 ${styles.content_wrapper}`}>
            <div className="d-flex flex-column justify-content-between align-items-center h-100">
              <div>
                <Image src={'/assets/images/icons/check-circle-outline.svg'} alt="Success" width={60} height={60} />
                <SectionTitles
                  titleTxt="¡Listo! Finalizaste la configuración de tu tienda"
                  subTxt="Recuerda que podrás modificar estos datos desde tu tienda"
                  isCentered
                />
              </div>
              {id === 'tiendanube' && (
                <div className={`${styles.next_steps}`}>
                  <p>
                    Para terminar de configurar tu cuenta, debes habilitar el número de teléfono como obligatorio en el
                    checkout de tu tienda.
                  </p>
                  <ButtonSmall
                    type="button"
                    
                    btnTxt="Configurar número de teléfono"
                    onClickFn={()=> window.open(`${storeUrl}/admin/preferences/checkout`, "_blank")}
                  />
                </div>
              )}
              {['woocommerce', 'prestashop'].includes(id) && (
                <div className={`${styles.next_steps}`}>
                  <p>
                    Has finalizado tu configuracion incial para OCA.
                  </p>
                  <p>Ahora necesitas configurar los puntos de retiro. Para esto, dirigete a <span>{name} {'>'} Ajustes {'>'} Envíos {'>'} Zonas de envíos</span></p>
                </div>
              )}
              {id === 'vtex' && (
                <div className={`${styles.next_steps}`}>
                  <p>Para terminar de configurar tu cuenta, debes volver a iniciar sesión.</p>
                  <ButtonSmall
                    type="button"
                    btnTxt="Iniciar sesión en OCA"
                    onClickFn={vtexRedirect}
                  />
                </div>
              )}
              <div className='d-flex'>
                {id !== 'vtex' && (
                  <Link href={`/${id}/panel/orders?userId=${userId}`} >
                    <a className={`${styleBtn.btn_link}`} href={`/${id}/panel/orders?userId=${userId}`}>Ir al panel</a>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Main>
  );
};

export default Finish;
