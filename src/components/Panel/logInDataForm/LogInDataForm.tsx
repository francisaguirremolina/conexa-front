import React, { useState, useEffect, FC } from 'react';
import { useForm } from '@mantine/form';
import PanelService from '@/services/api/panel';
import { manageLoadingState } from '@/services/utils.service';

import InputsSimple from '@/components/units/Inputs';
import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';
import styles from '../../Onboarding/forms/accountForm.module.sass';
import Navigation from '@/components/Onboarding/navigation/Navigation';
import { validation } from '@/services/validations.service';

interface Props {
  isInsidePanel?: boolean;
  updateOtherTabsInfo: () => void;
}

const LogInDataForm: FC<Props> = ({ isInsidePanel = false, updateOtherTabsInfo }) => {
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      accountNumber: '',
    },
    validate: {
      email: (value: string) => validation(value, 'emailFormat'),
      password: (value: string) => validation(value, 'minLength'),
      accountNumber: (value: string) => validation(value, 'accountFormat'),
    },
  });

  useEffect(() => {
    getLogInSavedData();
  }, []);

  const handleChange = (e) => {
    form.setFieldValue(`${e.target.id}`, e.target.value);
  };

  const getLogInSavedData = async () => {
    setIsFetchingData(true);
    const result: any = await PanelService.getLogInData();
    form.setValues({...result?.logInSettings});
    setIsFetchingData(false);
  };

  const saveLogInChanges = async (values) => {
    setIsLoading(true);
    manageLoadingState(setIsLoading);
    const result: any = await PanelService.editLogInData({ logInSettings: values });   
    // if(!result.hasShippingSettings){
    //   manuallyShowError("La cuenta no tiene operativas asociadas. Verifica tu cuenta de E-Pak.");
    // }
    
    if(result?.success){
      updateOtherTabsInfo();
    }
  };

  if (isFetchingData) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="spinner-grow spinner-grow-sm" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }
  return (
    <form
      id={`${styles.form_wrapper}`}
      className={isInsidePanel ? `${styles.inside_panel}` : ''}
      onSubmit={form.onSubmit((values) => saveLogInChanges(values))}
    >
      {!isFetchingData ? (
        <div className={`${styles.inputs_wrapper} mb-3`}>
          <InputsSimple
            {...form.getInputProps('email')}
            id="email"
            type="text"
            placeholder=""
            labelTxt="Email de tu cuenta OCA *"
            onChangeFn={handleChange}
            resultValidation={form.errors.email ? 'is_invalid' : ''}
            errorTxt={form.errors.email}
            customValue={String(form.values.email).replace(/^0+/, '')}
          />
          <InputsSimple
            {...form.getInputProps('password')}
            id="password"
            type="password"
            placeholder=""
            labelTxt="Contraseña *"
            onChangeFn={handleChange}
            resultValidation={form.errors.password ? 'is_invalid' : ''}
            errorTxt={form.errors.password}
            customValue={form.values.password}
          />
          <InputsSimple
            {...form.getInputProps('accountNumber')}
            id="accountNumber"
            type="text"
            placeholder=""
            labelTxt="Número de cuenta OCA *"
            onChangeFn={handleChange}
            resultValidation={form.errors.accountNumber ? 'is_invalid' : ''}
            errorTxt={form.errors.accountNumber}
            customValue={form.values.accountNumber}
          />
        </div>
      ) : (
        <Skeleton count={1} height={10} style={{ marginBottom: '10px' }} />
      )}
      <Navigation btnType="submit" btnSpinner={isLoading} btnTxt="Guardar" />
    </form>
  );
};

export default LogInDataForm;
