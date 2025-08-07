import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';

import { ButtonSmall } from '@/components/units/Button';
import InputsSimple from '@/components/units/Inputs';
import OnboardingService from '@/services/api/onboarding';
import PanelService from '@/services/api/panel';
import { extractInfoFromCookies } from '@/services/utils.service';
import { validateFullInfoComplete, validation } from '@/services/validations.service';
import { useCrossDataStore, useOnboardingStore } from '@/store';
import initialState from '@/store/initialState/onboarding';

import styles from './signInForm.module.sass';

const SignInForm = () => {
  const router = useRouter();
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);
  const { initialStateSetter } = useOnboardingStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [waitCallBack, setWaitCallBack] = useState(true);
  const userId = extractInfoFromCookies('userId');

  const fetchInitialState = async () => {
    // @ts-ignore
    const data = await OnboardingService.getInitialState();
    if(Object.keys(data).length === 0){
      // @ts-ignore
      initialStateSetter(initialState)
    } else {
      // @ts-ignore
      initialStateSetter(data.data);
    }
    // @ts-ignore
    if (data?.success) {
      if(ecommerceSelected !== 'vtex'){
        router.push(`/${ecommerceSelected}/onboarding/remitter`);
      } else {
        router.push(`/${ecommerceSelected}/onboarding/locations`);
      }
    }
  };

  const form = useForm({
    initialValues: {
      email: '',
      accountNumber: '',
      password: '',
    },
    validate: {
      email: (value: string) => validation(value, 'emailFormat'),
      accountNumber: (value: string) => validation(value, 'accountFormat'),
      password: (value: string) => validation(value, 'minLength'),
    },
  });

  const handleChange = (e) => {
    form.setFieldValue(`${e.target.id}`, e.target.value);
  };

  useEffect(() => {
    validateFullInfoComplete([form.values.email, form.values.accountNumber, form.values.password], setIsFormComplete)
  }, [form.values])

  const submitSignIn = async (values: typeof form.values) => {
    try{
      setIsLoading(true);
      setWaitCallBack(false);
      form.validate();
      let result = null;
      if (ecommerceSelected === 'vtex') {
        // @ts-ignore
        const { success } = await OnboardingService.authClient(values);
        result = success;
      } else {
        if(userId !== undefined){
          // @ts-ignore
        const { success } = await OnboardingService.newAuth(values);
        result = success;
        }
        else {
          // @ts-ignore
          const { data, success } = await PanelService.revalidateLogin(values);
          Cookies.set('userId', data.userId, { expires: 365 });
          if(success){
            router.push(`/${ecommerceSelected}/panel/orders`);
          }
        }
      }
      if (result) {
        await fetchInitialState();
      }
    } finally{
      setIsLoading(false);
      setWaitCallBack(true);
    }
  };

  return (
    <form className={`${styles.form_wrapper}`} onSubmit={form.onSubmit((values) => submitSignIn(values))}>
      <InputsSimple
        id="accountNumber"
        {...form.getInputProps('accountNumber')}
        type="text"
        // placeholder="Ej: 666666/333"
        labelTxt="Número de cuenta OCA *"
        onChangeFn={handleChange}
        resultValidation={form.errors?.accountNumber ? 'is_invalid' : ''}
        errorTxt={form.errors?.accountNumber}
        customValue={form.values.accountNumber}
      />
      <InputsSimple
        {...form.getInputProps('email')}
        id="email"
        type="text"
        labelTxt="Email de tu cuenta OCA *"
        onChangeFn={handleChange}
        resultValidation={form.errors?.email ? 'is_invalid' : ''}
        errorTxt={form.errors?.email}
        customValue={form.values.email}
      />
      <InputsSimple
        {...form.getInputProps('password')}
        id="password"
        type="password"
        labelTxt="Contraseña *"
        onChangeFn={handleChange}
        resultValidation={form.errors?.password ? 'is_invalid' : ''}
        errorTxt={form.errors?.password}
        customValue={form.values.password}
      />
      <ButtonSmall type="submit" btnTxt="Iniciar sesión" showSpinner={isLoading} loadingText isDisabled={!isFormComplete || !waitCallBack} />
    </form>
  );
};

export default SignInForm;