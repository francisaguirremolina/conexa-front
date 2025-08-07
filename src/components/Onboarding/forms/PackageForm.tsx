import React, { useEffect, useState, FC } from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';

import Radio from '@/components/units/Radio';
import RadioButton from '@/components/units/RadioButton';
import { fixedPackagesInfo } from '@/constants';
import OnboardingService from '@/services/api/onboarding';
import { noVtexEcommerce } from '@/services/utils.service';
import { validateSum, validation } from '@/services/validations.service';
import { loadPreSavedData, preparePackageBody } from '@/services/onboarding.service';
import { useCrossDataStore, useOnboardingStore } from '@/store';

import Navigation from '../navigation/Navigation';
import BoxChildren from './packageInputGroups/BoxChildren';

import styles from './packageForm.module.sass';
import PersonalizedGroup from './packageInputGroups/PersonalizedGroup';

interface Props {
  isInsidePanel?: boolean;
}

const PackageForm: FC<Props> = ({ isInsidePanel = false }) => {
  const router = useRouter();
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);
  const { packageSetter } = useOnboardingStore();
  const packageSettings = useOnboardingStore((state) => state.packageSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [isPassingValuesSum, setIsPassingValuesSum] = useState(false);

  const [predefinedSize, setPredefinedSize] = useState('');
  const [fixedOptionSelected, setfixedOptionSelected] = useState('');
  const [fixedValueSelected, setFixedValueSelected] = useState({ width: '', height: '', length: '' });
  const form = useForm({
    initialValues: {
      width: '',
      height: '',
      length: '',
    },
    validate: {
      width: (value: string | any) => (predefinedSize === 'fixed' ? null : validation(value, 'maxSize', 0, 0, 398)),
      height: (value: string | any) => (predefinedSize === 'fixed' ? null : validation(value, 'maxSize', 0, 0, 398)),
      length: (value: string | any) => (predefinedSize === 'fixed' ? null : validation(value, 'maxSize', 0, 0, 398)),
    },
  });

  useEffect(() => {
    validateSum(form, setIsPassingValuesSum);
  }, [form]);

  useEffect(() => {
    loadPreSavedData(
      packageSettings,
      fixedPackagesInfo,
      setPredefinedSize,
      setFixedValueSelected,
      setfixedOptionSelected,
      form,
    );
  }, []);

  const handleRadioChange = (e) => {
    setPredefinedSize(e.target.value);
    if (e.target.value === 'personalized') {
      setfixedOptionSelected('');
      setFixedValueSelected({ width: '', height: '', length: '' });
    } else {
      form.reset();
    }
  };

  const handleRadioDeepLevel = (e) => {
    setfixedOptionSelected(e.target.id);
    const splittedSize = e.target.value.split('x');
    setFixedValueSelected({ width: splittedSize[0], height: splittedSize[1], length: splittedSize[2] });
  };

  const handleTextChange = (e) => {
    form.setFieldValue(`${e.target.id}`, e.target.value);
  };

  const confirmCreation = async ({ reqBody }) => {
    try {
      setIsLoading(true);
      const { success }: any = await OnboardingService.confirmCarrier({ packageSettings: reqBody });
      if (success && ['woocommerce', 'prestashop'].includes(ecommerceSelected)) {
        router.push(`/${ecommerceSelected}/onboarding/services`);
      } else {
        router.push(`/${ecommerceSelected}/onboarding/finish`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const savePackageConfig = async (values: typeof form.values) => {
    try {
      setIsLoading(true);
      form.validate();
      const reqBody = preparePackageBody(predefinedSize, fixedValueSelected, values);
      const { success }: any = await OnboardingService.sendUserConfig({ packageSettings: reqBody });
      if (success) {
        packageSetter({
          width: Number(predefinedSize === 'fixed' ? fixedValueSelected.width : values.width),
          height: Number(predefinedSize === 'fixed' ? fixedValueSelected.height : values.height),
          length: Number(predefinedSize === 'fixed' ? fixedValueSelected.length : values.length),
        });
        if (!isInsidePanel) {
          if (noVtexEcommerce(ecommerceSelected)) {
            // TODO: CHECK THIS !!!!!!!!!!!!!!!!!!!!!!!!
            confirmCreation({ reqBody });
          } else {
            router.push(`/${ecommerceSelected}/onboarding/finish`);
          }
        } else {
          router.push(`/${ecommerceSelected}/panel/package`);
        }
      }
    } finally {
      if (isInsidePanel) {
        setIsLoading(false);
      }
    }
  };

  return (
    <form id={`${styles.form_wrapper}`} onSubmit={form.onSubmit((values) => savePackageConfig(values))}>
      <div>
        <div>
          <Radio
            value="fixed"
            id="fixed"
            name="predefinedSize"
            onChangeFn={handleRadioChange}
            checked={predefinedSize === 'fixed'}
          >
            <span>Selecciona la caja por defecto de tus paquetes</span>
          </Radio>
          <div className="d-flex justify-content-start align-items-center mt-3">
            {fixedPackagesInfo.map((option) => (
              <RadioButton
                key={`option-${option.id}`}
                value={option.size}
                id={option.id}
                name="fixedOptionSelected"
                onChangeFn={handleRadioDeepLevel}
                checked={fixedOptionSelected === option.id}
                disabled={predefinedSize === 'personalized' || predefinedSize === ''}
                extraClassName="illustrated_boxes"
              >
                <BoxChildren
                  option={option}
                  predefinedSize={predefinedSize}
                  fixedOptionSelected={fixedOptionSelected}
                />
              </RadioButton>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <Radio
            value="personalized"
            id="personalized"
            name="predefinedSize"
            onChangeFn={handleRadioChange}
            checked={predefinedSize === 'personalized'}
          >
            <span>Configura una caja manualmente</span>
          </Radio>
          <PersonalizedGroup
            form={form}
            handleTextChange={handleTextChange}
            predefinedSize={predefinedSize}
            isPassingValuesSum={isPassingValuesSum}
          />
        </div>
      </div>
      <Navigation
        linkHref={isInsidePanel ? '' : `/${ecommerceSelected}/onboarding/account`}
        btnType="submit"
        btnTxt={isInsidePanel ? 'Guardar' : 'Continuar'}
        btnSpinner={isLoading}
        btnDisabled={!predefinedSize || (predefinedSize === 'personalized' && !isPassingValuesSum)}
      />
    </form>
  );
};

export default PackageForm;
