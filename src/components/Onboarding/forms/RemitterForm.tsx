import React, { useState, FC, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';

import OnboardingService from '@/services/api/onboarding';
import { manageLoadingState } from '@/services/utils.service';
import { validateFullInfoComplete, validation } from '@/services/validations.service';
import { useCrossDataStore, useOnboardingStore } from '@/store';

import Navigation from '../navigation/Navigation';
import SectionTitles from '../sectionTitles/SectionTitles';
import styles from './remitterForm.module.sass';
import AddressInputs from './remitterInputGroups/AddressInputs';
import PersonalDataInputs from './remitterInputGroups/PersonalDataInputs';

interface Props {
  isInsidePanel?: boolean;
}

const RemitterForm: FC<Props> = ({ isInsidePanel = false }) => {
  const router = useRouter();
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);
  const { remitterSetter } = useOnboardingStore();
  const remitterSettings = useOnboardingStore((state) => state.remitter);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const form = useForm({
    initialValues: {
      firstName: remitterSettings?.firstName || '',
      lastName: remitterSettings?.lastName || '',
      companyName: remitterSettings?.companyName || '',
      cuit: remitterSettings?.cuit || '',
      province: remitterSettings?.address?.province || '',
      locality: remitterSettings?.address?.locality || '',
      number: remitterSettings?.address?.number || '',
      street: remitterSettings?.address?.street || '',
      floor: remitterSettings?.address?.floor || '',
      apartment: remitterSettings?.address?.apartment || '',
      postalCode: remitterSettings?.address?.postalCode || '',
    },
    validate: {
      firstName: (value: string) => validation(value, 'minLength'),
      lastName: (value: string) => validation(value, 'minLength'),
      companyName: (value: string) => validation(value, 'minLength'),
      cuit: (value: string) => validation(value, 'cuitFormat'),
      province: (value: string) => validation(value, 'minLength'),
      locality: (value: string) => validation(value, 'minLength'),
      number: (value: string | any) => validation(value, 'minLength'),
      street: (value: string) => validation(value, 'minLength'),
      postalCode: (value: string | any) => validation(value, 'maxLength', 1, 4),
    },
  });

  const handleChange = (e) => {
    form.setFieldValue(`${e.target.id}`, e.target.value);
  };

  useEffect(() => {
    validateFullInfoComplete(
      [
        form.values.firstName,
        form.values.lastName,
        form.values.companyName,
        form.values.cuit,
        form.values.province,
        form.values.locality,
        form.values.number,
        form.values.street,
        form.values.postalCode,
      ],
      setIsFormComplete,
    );
  }, [form.values]);

  const saveRemitter = async (values: typeof form.values) => {
    form.validate();
    const structuredInfo = {
      firstName: values.firstName,
      lastName: values.lastName,
      companyName: values.companyName,
      cuit: values.cuit,
      address: {
        province: values.province,
        locality: values.locality,
        number: values.number,
        street: values.street,
        floor: values.floor,
        apartment: values.apartment,
        postalCode: String(values.postalCode),
      },
    };
    setIsLoading(true);
    manageLoadingState(setIsLoading);
    const { success }: any = await OnboardingService.sendUserConfig({ remitter: structuredInfo });
    if (success) {
      remitterSetter({ ...structuredInfo });
      router.push(
        `${isInsidePanel ? `/${ecommerceSelected}/panel/remitter` : `/${ecommerceSelected}/onboarding/dispatch`}`,
      );
    }
  };

  return (
    <form id={`${styles.form_wrapper}`} onSubmit={form.onSubmit((values) => saveRemitter(values))}>
      <div className={`${styles.inputs_wrapper}`}>
        <PersonalDataInputs form={form} handleChange={handleChange} ecommerce={ecommerceSelected} />
      </div>

      <div>
        <SectionTitles titleTxt="Dirección de origen" isMain={false} />
        <div className={`${styles.inputs_wrapper} ${styles.second_group}`}>
          <AddressInputs form={form} handleChange={handleChange} />
        </div>
      </div>

      <Navigation
        linkHref={isInsidePanel ? '' : `/${ecommerceSelected}/onboarding/sign-in`}
        btnType="submit"
        btnTxt={isInsidePanel ? 'Guardar' : 'Continuar'}
        btnSpinner={isLoading}
        btnDisabled={!isFormComplete}
      />
    </form>
  );
};

export default RemitterForm;
