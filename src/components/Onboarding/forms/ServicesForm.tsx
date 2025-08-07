import React, { useEffect, useState } from 'react'
import CheckboxButton from '@/components/units/CheckboxButton'
import { useRouter } from 'next/router';
import { useCrossDataStore, useOnboardingStore } from '@/store';
import Navigation from '../navigation/Navigation';
import OnboardingService from '@/services/api/onboarding';
import styles from './serviceForm.module.sass';

const ServicesForm = ({ isInsidePanel = false }) => {
  const router = useRouter();
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidate, setIsValidate] = useState(true);
  const servicesTypesSettings = useOnboardingStore((state) => state.servicesTypesSettings);
  const { servicesTypesSetter } = useOnboardingStore();
  const [services, setServices] = useState(servicesTypesSettings);

  useEffect(() => {
    const result = Object.values(services).some(val => val === true);
    setIsValidate(!result);
  }, [services]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setServices((prevServices) => ({
      ...prevServices,
      [value]: checked,
    }));
  };
  
  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      setIsLoading(true);
      const body = { toDoor: services.toDoor, toStore: services.toStore};
      // @ts-ignore
      const { success } = await OnboardingService.sendUserConfig({ servicesTypesSettings: body });
      if(success){
        servicesTypesSetter({
          toDoor: Boolean(body.toDoor),
          toStore: Boolean(body.toStore)
        });
        router.push(isInsidePanel ? `/${ecommerceSelected}/panel/services` : `/${ecommerceSelected}/onboarding/finish`);
      }
    } finally{
        setIsLoading(false);
    }
  }

  return (
    <form id={`${styles.form_wrapper}`}>
      <div>
        <p>Elige 1 o 2 de los servicios que deseas ofrecer:</p>
        <CheckboxButton
        id='door'
        value='toDoor'
        extraClassName='justify-content-start'
        extraLabelClass='ms-2 fw-light'
        onChangeFn={handleCheckboxChange}
        checked={services.toDoor}
        >
          Servicio a Domicilio
        </CheckboxButton>
        <CheckboxButton
        id='store'
        value='toStore'
        extraClassName='justify-content-start'
        extraLabelClass='ms-2 fw-light'
        onChangeFn={handleCheckboxChange}
        checked={services.toStore}
        >
          Servicio a Sucursal
        </CheckboxButton>
      </div>
      <Navigation
        linkHref={isInsidePanel ? '' : `/${ecommerceSelected}/onboarding/package`}
        btnFn={handleSubmit}
        btnType="button"
        btnTxt={isInsidePanel ? 'Guardar' : 'Continuar'}
        btnSpinner={isLoading}
        btnDisabled={isValidate}
      />
    </form>
  )
}

export default ServicesForm