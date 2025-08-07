import Image from 'next/image';
import React, { useEffect, useState, FC } from 'react';

import RadioButton from '@/components/units/RadioButton';
import { useCrossDataStore, useOnboardingStore } from '@/store';

import styles from '../dispatchForm.module.sass';
import { noVtexEcommerce } from '@/services/utils.service';

interface Props {
  form: any;
  handleChange: (e: any) => void;
  selectedStoreAddress: string;
  operatingLocationAddress?: string;
}

const OriginInputs: FC<Props> = ({ form, handleChange, selectedStoreAddress, operatingLocationAddress }) => {
  const [isGettingInfo, setisGettingInfo] = useState(true);
  const [savedInfo, setSavedInfo] = useState({ street: '', number: '' });
  const remitterSettings = useOnboardingStore((state) => state?.remitter?.address);
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);

  useEffect(() => {
    if (noVtexEcommerce(ecommerceSelected)) {
      setSavedInfo(remitterSettings);
    }
    setisGettingInfo(false);
  }, []);

  return (
    <div className="d-flex justify-content-start align-items-start mt-3 h-100">
      <RadioButton
        value="home"
        id="home"
        name="defaultDispatchType"
        onChangeFn={handleChange}
        checked={form.values.defaultDispatchType === 'home'}
        extraClassName="illustrated"
      >
        <div className={`${styles.btn_illustrated} h-100`}>
          <div className={`${styles.btn_illustrated_wrapper} mb-1`}>
            <Image src={'/assets/images/pin-home.png'} alt="home" width={35} height={40} />
            <div className={`${styles.btn_illustrated_text}`}>
              <h5>Domicilio</h5>
              {noVtexEcommerce(ecommerceSelected) && !isGettingInfo && (
                <p>
                  {savedInfo?.street} {savedInfo?.number}
                </p>
              )}
              {ecommerceSelected === 'vtex' && <p>{operatingLocationAddress}</p>}
            </div>
          </div>
          <div className={`${styles.extra_info}`}>
            <span>
              Habrá un cargo adicional si despachas menos de 5 envíos diarios. Puedes seleccionar los días en que desees
              que OCA retire tus envíos, de lunes a viernes o en días específicos.
            </span>
          </div>
        </div>
      </RadioButton>
      <RadioButton
        value="store"
        id="store"
        name="defaultDispatchType"
        onChangeFn={handleChange}
        checked={form.values.defaultDispatchType === 'store'}
        extraClassName="illustrated"
      >
        <div className={`${styles.btn_illustrated} h-100`}>
          <div className={`${styles.btn_illustrated_wrapper} mb-1`}>
            <Image src={'/assets/images/pin-store.png'} alt="home" width={35} height={40} />
            <div className={`${styles.btn_illustrated_text}`}>
              <h5>Sucursal</h5>
              <p>{selectedStoreAddress}</p>
            </div>
          </div>
          <div className={`${styles.extra_info}`}>
            <span>Deberás visitar una sucursal de OCA para despachar tus pedidos.</span>
          </div>
        </div>
      </RadioButton>
    </div>
  );
};

export default OriginInputs;
