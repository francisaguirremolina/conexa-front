import React, { useState, FC, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import initialState from '@/store/initialState/onboarding';

import { ButtonSmall } from '@/components/units/Button';
import InputsSimple from '@/components/units/Inputs';
import OnboardingService from '@/services/api/onboarding';
import { validateFullInfoComplete, validation } from '@/services/validations.service';
import { useCrossDataStore, useOnboardingStore } from '@/store';

import styles from './signInVtexForm.module.sass';
import Cookies from 'js-cookie';

const SignInVtexForm: FC = () => {
  const router = useRouter();
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);
  const { initialStateSetter } = useOnboardingStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const form = useForm({
    initialValues: {
      urlStore: '',
      pass: '',
    },
    validate: {
      urlStore: (value: string) => validation(value, 'urlFormat'),
      pass: (value: string) => validation(value, 'minLength'),
    },
  });

  const handleChange = (e) => {
    form.setFieldValue(`${e.target.id}`, e.target.value);
  };

  useEffect(() => {
    validateFullInfoComplete([form.values.urlStore, form.values.pass], setIsFormComplete);
  }, [form.values]);

  const submitSignIn = async (values: typeof form.values) => {
    try {
      setIsLoading(true);
      form.validate();
      // @ts-ignore
      const { success, token, userId } = await OnboardingService.logInVtex(values);
      if (success) {
        Cookies.set('token', token, { expires: 365 });
        Cookies.set('userId', userId, { expires: 365 });
        const { data } = await OnboardingService.getInitialState();
        if (Object.keys(data).length === 0) {
          // @ts-ignore
          initialStateSetter(initialState);
        } else {
          initialStateSetter(data);
        }

        router.push(`/${ecommerceSelected}/panel/orders`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={`${styles.form_wrapper}`} onSubmit={form.onSubmit((values) => submitSignIn(values))}>
      <InputsSimple
        {...form.getInputProps('urlStore')}
        customValue={form.values.urlStore}
        id="urlStore"
        type="text"
        labelTxt="URL de la tienda VTEX *"
        onChangeFn={handleChange}
        resultValidation={form.errors.urlStore ? 'is_invalid' : ''}
        errorTxt={form.errors.urlStore}
      />
      <InputsSimple
        {...form.getInputProps('pass')}
        customValue={form.values.pass}
        id="pass"
        type="password"
        labelTxt="Contraseña *"
        onChangeFn={handleChange}
        resultValidation={form.errors.pass ? 'is_invalid' : ''}
        errorTxt={form.errors.pass}
      />
      <ButtonSmall
        type="submit"
        btnTxt="Iniciar sesión"
        showSpinner={isLoading}
        loadingText
        isDisabled={!isFormComplete}
      />
    </form>
  );
};

export default SignInVtexForm;
