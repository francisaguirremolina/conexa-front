import React, { useState, FC, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';

import { useCrossDataStore } from '@/store';
import { manageLoadingState, validateFullInfoComplete } from '@/services/utils.service';
import { validation } from '@/services/validations.service';
import { SingleLocation } from '@/@types/locations';
import Navigation from '../navigation/Navigation';

import styles from './locationConfigForm.module.sass';
import PersonalDataInputs from './remitterInputGroups/PersonalDataInputs';
import OnboardingService from '@/services/api/onboarding';
import PanelService from '@/services/api/panel';

interface Props {
  locationData: SingleLocation;
  isInsidePanel?: boolean;
}

const LocationConfigForm: FC<Props> = ({ locationData, isInsidePanel = false }) => {
  const router = useRouter();
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const form = useForm({
    initialValues: {
      firstName: locationData?.firstName || '',
      lastName: locationData?.lastName || '',
      companyName: locationData?.companyName || '',
      cuit: locationData?.cuit || '',
    },
    validate: {
      firstName: (value: string) => validation(value, 'minLength'),
      lastName: (value: string) => validation(value, 'minLength'),
      companyName: (value: string) => validation(value, 'minLength'),
      cuit: (value: string) => validation(value, 'cuitFormat'),
    },
  });

  const handleChange = (e) => {
    form.setFieldValue(`${e.target.id}`, e.target.value);
  };

  useEffect(() => {
    validateFullInfoComplete(
      [form.values.firstName, form.values.lastName, form.values.companyName, form.values.cuit],
      setIsFormComplete,
    );
  }, [form.values]);

  // @ts-ignore
  const saveConfiguration = async (values: typeof form.values) => {
    form.validate();
    setIsLoading(true);
    manageLoadingState(setIsLoading);
    const body = {
      ...values,
      dockId: locationData?.locationId,
    };
    let result = null;
    if (isInsidePanel) {
      // @ts-ignore
      const { success } = await PanelService.updatePanelDocks(body);
      result = success;
    } else {
      // @ts-ignore
      const { success } = await OnboardingService.updateDocks(body);
      result = success;
    }
    if (result) {
      router.push(
        `${
          isInsidePanel
            ? `/${ecommerceSelected}/panel/${ecommerceSelected === 'vtex' ? 'locations' : 'account'}`
            : `/${ecommerceSelected}/onboarding/${ecommerceSelected === 'vtex' ? 'locations' : 'remitter'}`
        }`,
      );
    }
    setIsLoading(false);
  };

  return (
    <form
      id={`${styles.form_wrapper}`}
      className={isInsidePanel ? `${styles.inside_panel_second}` : ''}
      onSubmit={form.onSubmit((values) => saveConfiguration(values))}
    >
      <div className={`${styles.inputs_wrapper}`}>
        <PersonalDataInputs form={form} handleChange={handleChange} />
      </div>

      <Navigation
        linkHref={`/${ecommerceSelected}/${isInsidePanel ? 'panel' : 'onboarding'}/locations`}
        btnType="submit"
        btnSpinner={isLoading}
        btnDisabled={!isFormComplete}
        btnTxt="Guardar"
      />
    </form>
  );
};

export default LocationConfigForm;
