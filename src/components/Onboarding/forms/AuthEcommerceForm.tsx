import React, {useState, FC, useEffect} from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';

import { ButtonSmall } from '@/components/units/Button';
import InputsSimple from '@/components/units/Inputs';
import OnboardingService from '@/services/api/onboarding';
import { manageLoadingState } from '@/services/utils.service';
import { validateFullInfoComplete, validation } from '@/services/validations.service';
import { useCrossDataStore } from '@/store';

import styles from './authEcommerceForm.module.sass';
import Cookies from 'js-cookie';

const AuthEcommerceForm: FC = () => {
  const router = useRouter();
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  

  const form = useForm({
    initialValues: {
      vtexKey: '',
      vtexToken: '',
      vtexUrl: '',
    },
    validate: {
      vtexKey: (value: string) => validation(value, 'minLength'),
      vtexToken: (value: string) => validation(value, 'minLength'),
      vtexUrl: (value: string) => validation(value, 'urlFormat')
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    const trimmedValue = value.replace(/\s/g, '');
    form.setFieldValue(id, trimmedValue);
  };

  useEffect(() => {
    validateFullInfoComplete([form.values.vtexKey, form.values.vtexToken, form.values.vtexUrl], setIsFormComplete)
  }, [form.values])

  const submitAuth = async (values: typeof form.values) => {
    form.validate();
    // @ts-ignore
    manageLoadingState(setIsLoading);
    // @ts-ignore
    const { success, userId } = await OnboardingService.authVtex(values);
    if (success) {
      Cookies.set('userId', userId, { expires: 365 });
      router.push(`/${ecommerceSelected}/onboarding/sign-in`);
    }
  };

  return (
    <form className={`${styles.form_wrapper}`} onSubmit={form.onSubmit((values) => submitAuth(values))}>
      <InputsSimple
        {...form.getInputProps('vtexKey')}
        customValue={form.values.vtexKey}
        id="vtexKey"
        type="text"
        labelTxt="API key *"
        onChangeFn={handleChange}
        resultValidation={form.errors.vtexKey ? 'is_invalid' : ''}
        errorTxt={form.errors.vtexKey}
      />
      <InputsSimple
        {...form.getInputProps('vtexToken')}
        customValue={form.values.vtexToken}
        id="vtexToken"
        type="text"
        placeholder=""
        labelTxt="API secret *"
        onChangeFn={handleChange}
        resultValidation={form.errors.vtexToken ? 'is_invalid' : ''}
        errorTxt={form.errors.vtexToken}
      />
      <InputsSimple
        {...form.getInputProps('vtexUrl')}
        customValue={form.values.vtexUrl}
        id="vtexUrl"
        type="text"
        labelTxt="URL de la tienda VTEX *"
        onChangeFn={handleChange}
        resultValidation={form.errors.vtexUrl ? 'is_invalid' : ''}
        errorTxt={form.errors.vtexUrl}
      />
      <ButtonSmall type="submit" btnTxt="Iniciar sesión" showSpinner={isLoading} isDisabled={!isFormComplete} />
    </form>
  );
};

export default AuthEcommerceForm;
