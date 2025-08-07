import React, { useEffect, useState, FC } from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';

import PanelService from '@/services/api/panel';
import OnboardingService from '@/services/api/onboarding';
import { useCrossDataStore, useOnboardingStore } from '@/store';

import Navigation from '../navigation/Navigation';
import styles from './accountForm.module.sass';
import { InputsSelect } from '@/components/units/Select';

const renderInputsSelect = (options) => {
  return options.map((option) => (
    <InputsSelect
      key={option.id}
      enableFirstOption
      id={option.id}
      labelTxt={option.labelTxt}
      placeholder={option.placeholder}
      value={option.value}
      previouslySelected={option.previouslySelected}
      onChangeFn={option.onChangeFn}
      arrayList={option.arrayList}
    />
  ));
};

interface Props {
  isInsidePanel?: boolean;
}
const AccountForm: FC<Props> = ({ isInsidePanel = false }) => {
  const router = useRouter();
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);
  const dispatchSelected = useOnboardingStore((state) => state.dispatchSettings.defaultDispatchType);
  const { shippingSetter } = useOnboardingStore();
  const shippingSettings = useOnboardingStore((state) => state.shippingSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isBtnEnabled, setIsBtnEnabled] = useState(true);
  const { locationId } = router.query;
  const form = useForm({
    initialValues: {
      doorToDoor: shippingSettings?.doorToDoor || '',
      doorToStore: shippingSettings?.doorToStore || '',
      doorToLocker: shippingSettings?.doorToLocker || '',
      storeToDoor: shippingSettings?.storeToDoor || '',
      storeToStore: shippingSettings?.storeToStore || '',
      storeToLocker: shippingSettings?.storeToLocker || '',
    },
  });
  const [operationals, setOperationals] = useState({
    doorToDoorOptions: [],
    doorToStoreOptions: [],
    doorToLockerOptions: [],
    storeToDoorOptions: [],
    storeToStoreOptions: [],
    storeToLockerOptions: [],
  });

  const getSettingsLists = async () => {
    setIsLoading(true);
    let userId: string | null;
    let result;

    const queryUserId = ecommerceSelected === 'tiendanube' ? 'store' : 'userId';

    userId = new URLSearchParams(window.location.search).get(queryUserId);

    if (ecommerceSelected !== 'vtex') {
      const { data } = await OnboardingService.getOperationals(userId);
      result = data;
    } else if (isInsidePanel) {
      const { data } = await PanelService.getPanelAccount(locationId);
      result = data;
    } else {
      const { data } = await OnboardingService.getOperationals(userId, locationId);
      result = data;
    }

    setOperationals({
      doorToDoorOptions: result.doorToDoor,
      doorToStoreOptions: result.doorToStore,
      doorToLockerOptions: result.doorToLocker,
      storeToDoorOptions: result.storeToDoor,
      storeToStoreOptions: result.storeToStore,
      storeToLockerOptions: result.storeToLocker,
    });

    if (ecommerceSelected !== 'vtex') {
      Object.entries(result).forEach(([key, operational]) =>
        form.setFieldValue(
          key,
          (operational as { value: string; name: string }[]).find(
            (item) => item.value === shippingSettings[key]?.toString(),
          )?.value || '',
        ),
      );
    } else {
      Object.entries(result).forEach(([key, operational]) =>
        form.setFieldValue(
          key,
          (operational as { dockIds: string[]; accountType: string }[]).find((item) =>
            item.dockIds?.includes(locationId as string),
          )?.accountType ?? '',
        ),
      );
    }

    setIsLoading(false);
  };

  async function handleSettingsList() {
    if (Object.values(operationals).every((op) => op.length === 0)) {
      if (ecommerceSelected === 'tiendanube' || locationId) {
        return getSettingsLists();
      }
    }
  }

  useEffect(() => {
    handleSettingsList();
  }, [locationId, operationals]);

  const handleChange = (e) => {
    if (e.target.value === 'Sin selección') {
      form.setFieldValue(`${e.target.id}`, '');
    } else form.setFieldValue(`${e.target.id}`, e.target.value);
  };

  const confirmCreation = async () => {
    try {
      setIsLoading(true);
      await OnboardingService.confirmCarrier();
    } finally {
      setIsLoading(false);
    }
  };

  function filterByDispatchType(dispatchSelected, originValues) {
    const newData = { ...originValues };
    const dispatchTypeMap = {
      home: ['storeToDoor', 'storeToStore', 'storeToLocker'],
      store: ['doorToDoor', 'doorToStore', 'doorToLocker'],
    };

    const fieldsToClear: string[] | undefined = dispatchTypeMap[dispatchSelected];
    if (fieldsToClear) {
      fieldsToClear.forEach((field) => (newData[field] = ''));
    }

    return newData;
  }

  const saveAccount = async (values: typeof form.values) => {
    setIsLoading(true);
    let redirect: string;
    let result;
    const shippingSettings = values;
    const locationId = router.query.locationId;
    if (ecommerceSelected === 'vtex') {
      const settings = { shippingSettings: filterByDispatchType(dispatchSelected, shippingSettings) };
      if (isInsidePanel) {
        const res = await PanelService.configPanelAccount(settings, locationId);
        result = res;
        redirect = `/${ecommerceSelected}/panel/locations`;
      } else {
        const res = await OnboardingService.configAccount(settings, locationId);
        result = res;
        redirect = `/${ecommerceSelected}/onboarding/locations`;
      }
    } else {
      if (isInsidePanel) {
        const response = await PanelService.sendPanelUserConfig({ shippingSettings }, locationId);
        result = response['success'];
        redirect = `/${ecommerceSelected}/panel/account`;
      } else {
        const response = await OnboardingService.sendUserConfig({ shippingSettings }, locationId);
        result = response['success'];
        if (ecommerceSelected === 'tiendanube') {
          redirect = `/${ecommerceSelected}/onboarding/finish`;
          confirmCreation();
        } else {
          redirect = `/${ecommerceSelected}/onboarding/package`;
        }
      }
    }
    if (result) {
      shippingSetter({
        doorToDoor: Number(values.doorToDoor) || values.doorToDoor,
        doorToStore: Number(values.doorToStore) || values.doorToStore,
        doorToLocker: Number(values.doorToLocker) || values.doorToLocker,
        storeToDoor: Number(values.storeToDoor) || values.storeToDoor,
        storeToStore: Number(values.storeToStore) || values.storeToStore,
        storeToLocker: Number(values.storeToLocker) || values.storeToLocker,
      });

      router.push(redirect);
    }
    setIsLoading(false);
  };

  const bussinessValidation = (formValues) => {
    const valuesArr = Object.values(formValues);
    const filtered = valuesArr.filter((v) => v !== '' && v !== 'Sin selección');

    if (filtered.length >= 1) {
      setIsBtnEnabled(true);
    } else {
      setIsBtnEnabled(false);
    }
  };

  useEffect(() => {
    bussinessValidation(form.values);
  }, [form.values]);

  const backBtnByEcommerce =
    ecommerceSelected === 'vtex'
      ? `/${ecommerceSelected}/onboarding/dispatch?postalCode=${router.query.postalCode}&locationId=${router.query.locationId}`
      : `/${ecommerceSelected}/onboarding/dispatch`;

  if (isLoading) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="spinner-grow spinner-grow-sm" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  const SelectOptions = {
    home: [
      {
        id: 'doorToDoor',
        labelTxt: 'Número de operativa Puerta a Puerta',
        placeholder: 'Sin selección',
        value: String(form.values.doorToDoor),
        previouslySelected: String(form.values.doorToDoor),
        onChangeFn: handleChange,
        arrayList: operationals.doorToDoorOptions,
      },
      {
        id: 'doorToStore',
        labelTxt: 'Número de operativa Puerta a Sucursal',
        placeholder: 'Sin selección',
        value: String(form.values.doorToStore),
        previouslySelected: String(form.values.doorToStore),
        onChangeFn: handleChange,
        arrayList: operationals.doorToStoreOptions,
      },
      {
        id: 'doorToLocker',
        labelTxt: 'Número de operativa Puerta a Locker',
        placeholder: 'Sin selección',
        value: String(form.values.doorToLocker),
        previouslySelected: String(form.values.doorToLocker),
        onChangeFn: handleChange,
        arrayList: operationals.doorToLockerOptions,
      },
    ],
    store: [
      {
        id: 'storeToDoor',
        labelTxt: 'Número de operativa Sucursal a Puerta',
        placeholder: 'Sin selección',
        value: String(form.values.storeToDoor),
        previouslySelected: String(form.values.storeToDoor),
        onChangeFn: handleChange,
        arrayList: operationals.storeToDoorOptions,
      },
      {
        id: 'storeToStore',
        labelTxt: 'Número de operativa Sucursal a Sucursal',
        placeholder: 'Sin selección',
        value: String(form.values.storeToStore),
        previouslySelected: String(form.values.storeToStore),
        onChangeFn: handleChange,
        arrayList: operationals.storeToStoreOptions,
      },
      {
        id: 'storeToLocker',
        labelTxt: 'Número de operativa Sucursal a Locker',
        placeholder: 'Sin selección',
        value: String(form.values.storeToLocker),
        previouslySelected: String(form.values.storeToLocker),
        onChangeFn: handleChange,
        arrayList: operationals.storeToLockerOptions,
      },
    ],
  };

  return (
    <form
      id={`${styles.form_wrapper}`}
      className={isInsidePanel ? `${styles.inside_panel_second}` : ''}
      onSubmit={form.onSubmit((values) => saveAccount(values))}
    >
      {!isLoading && (
        <div className={`${styles.inputs_wrapper}`}>
          {dispatchSelected && renderInputsSelect(SelectOptions[dispatchSelected])}
        </div>
      )}
      <Navigation
        linkHref={isInsidePanel ? '' : backBtnByEcommerce}
        btnType="submit"
        btnSpinner={isLoading}
        btnDisabled={!isBtnEnabled}
        btnTxt={isInsidePanel ? 'Guardar' : 'Continuar'}
      />
    </form>
  );
};

export default AccountForm;
