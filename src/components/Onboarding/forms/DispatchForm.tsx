import React, { useEffect, useState, FC } from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';

import { InputsSelect } from '@/components/units/Select';
import TooltipComp from '@/components/units/Tooltip';
import OnboardingService from '@/services/api/onboarding';
import PanelService from '@/services/api/panel';
import {
  capitalizeFirstLetter,
  manageLoadingState,
  mapAddressForSelect,
  noVtexEcommerce,
} from '@/services/utils.service';
import { useCrossDataStore, useOnboardingStore } from '@/store';

import Navigation from '../navigation/Navigation';
import SectionTitles from '../sectionTitles/SectionTitles';
import styles from './dispatchForm.module.sass';
import DaysAndTimeInputsGroup from './dispatchInputGroups/DaysAndTimeInputsGroup';
import OriginInputs from './dispatchInputGroups/OriginInputs';

interface Props {
  isInsidePanel?: boolean;
}

const DispatchForm: FC<Props> = ({ isInsidePanel = false }) => {
  const router = useRouter();
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);
  const { dipatchSetter } = useOnboardingStore();
  const dispatchSettings = useOnboardingStore((state) => state.dispatchSettings);
  const dispatchSelected = useOnboardingStore((state) => state?.dispatchSettings?.defaultDispatchType);
  const userId = useOnboardingStore((state) => state.userId);
  const remitterSettings = useOnboardingStore((state) => state.remitter);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStores, setIsLoadingStores] = useState(true);
  const [isOneDaySelected, setIsOneDaySelected] = useState(false);
  const [storeList, setStoreList] = useState<Array<{ name: string; value: any }>>([]);
  const [selectedStoreAddress, setSelectedStoreAddress] = useState('');
  const postalCodeFromParams = router.query.postalCode;
  const [dispatchType, setDispatchType] = useState(dispatchSelected);
  const isHome = dispatchType === 'home';

  const form = useForm({
    initialValues: {
      defaultStoreId: '',
      defaultDispatchType: '',
      activeDays: dispatchSettings?.activeDays || [
        { day: 1, active: false },
        { day: 2, active: false },
        { day: 3, active: false },
        { day: 4, active: false },
        { day: 5, active: false },
      ],
      defaultTimeRange: String(dispatchSettings?.defaultTimeRange) || '1',
    },
  });

  const getStoresList = async () => {
    setIsLoadingStores(true);
    try {
      const isVtexEcommerce = !noVtexEcommerce(ecommerceSelected);
      const ecommercePostalCode = isVtexEcommerce ? postalCodeFromParams : remitterSettings?.address?.postalCode;
      const locationId = router.query.locationId;
      let list = [];
      let dispatchFound;
      if (!isVtexEcommerce) {
        const { data } = await OnboardingService.getAvailableStores(ecommercePostalCode, userId);
        list = data;
        form.setFieldValue(`defaultDispatchType`, dispatchSelected);
      } else {
        if (!isInsidePanel) {
          const { data } = await OnboardingService.getAvailableStores(ecommercePostalCode);
          list = data;
          const { dispatch }: any = await OnboardingService.getDispatchType(ecommercePostalCode, locationId);
          dispatchFound = dispatch;
        } else {
          const { data } = await PanelService.getAvailableStoresPanel(ecommercePostalCode);
          list = data;
          const { dispatch }: any = await PanelService.getDispatchType(ecommercePostalCode, locationId);
          dispatchFound = dispatch;
        }
        if (dispatchFound) {
          dipatchSetter(dispatchFound);
        }
        form.setFieldValue(`defaultStoreId`, dispatchFound?.defaultStoreId);
        form.setFieldValue(`defaultDispatchType`, dispatchFound?.defaultDispatchType);
      }

      const formattedOptions = mapAddressForSelect(list);
      setStoreList(formattedOptions);

      const defaultStoreId = dispatchFound?.defaultStoreId
        ? dispatchFound.defaultStoreId
        : isVtexEcommerce
        ? null
        : dispatchSettings?.defaultStoreId;
      const previouslySelectedAddress: any = list.find((store: any) => store.impositionCenterId === defaultStoreId);

      if (previouslySelectedAddress) {
        setSelectedStoreAddress(
          `${capitalizeFirstLetter(previouslySelectedAddress.address?.street || '')} ${
            previouslySelectedAddress.address?.number || ''
          } - ${capitalizeFirstLetter(
            previouslySelectedAddress.address?.locality || previouslySelectedAddress.address?.province,
          )}`,
        );

        form.setFieldValue('defaultStoreId', previouslySelectedAddress.impositionCenterId);
      } else {
        setSelectedStoreAddress('');
        form.setFieldValue('defaultStoreId', '');
      }
    } catch (err) {
      console.log({ err });
    } finally {
      setIsLoadingStores(false);
    }
  };

  useEffect(() => {
    if (ecommerceSelected === 'vtex') {
      if (postalCodeFromParams) getStoresList();
    } else getStoresList();
  }, [postalCodeFromParams]);
  const handleSelectChange = (e) => {
    form.setFieldValue(`${e.target.id}`, e.target.value);
    setSelectedStoreAddress(e.target.options[e.target.selectedIndex].text);
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    form.setFieldValue(name, value);
    if (value === 'home' || value === 'store') {
      setDispatchType(value);
    }
  };

  const handleDaysChange = (id: number) => {
    const selectedIndex = form.values.activeDays.findIndex((element) => element.day === id);
    const daysCopy = [...form.values.activeDays];
    daysCopy[selectedIndex]!.active = !daysCopy[selectedIndex]!.active;
    form.setFieldValue('activeDays', daysCopy);
  };

  const validateOneDaySelected = () => {
    if (form.values.activeDays.some((day) => day.active)) {
      setIsOneDaySelected(true);
    } else {
      setIsOneDaySelected(false);
    }
  };

  useEffect(() => {
    validateOneDaySelected();
  }, [form.values.activeDays]);

  const saveDispatchConfig = async (values: typeof form.values) => {
    const locationId = router.query.locationId;
    form.validate();
    setIsLoading(true);
    manageLoadingState(setIsLoading);
    const { success }: any = await OnboardingService.sendUserConfig({ dispatchSettings: values }, locationId);
    if (success) {
      dipatchSetter({
        defaultStoreId: values.defaultStoreId,
        defaultDispatchType: values.defaultDispatchType,
        activeDays: [...values.activeDays],
        defaultTimeRange: values.defaultTimeRange,
      });

      const nextRoute = () => {
        if (ecommerceSelected !== 'vtex') {
          if (!isInsidePanel) {
            return `/${ecommerceSelected}/onboarding/account`;
          } else return `/${ecommerceSelected}/panel/dispatch`;
        } else {
          if (!isInsidePanel) {
            return `/${ecommerceSelected}/onboarding/account?postalCode=${postalCodeFromParams}&locationId=${locationId}`; // TODO add dinamic var => panel/onboarding
          } else
            return `/${ecommerceSelected}/panel/account?postalCode=${postalCodeFromParams}&locationId=${locationId}`;
        }
      };
      router.push(`${nextRoute()}`);
    }
  };

  const routesByEcommerce = {
    tiendanube: `tiendanube/onboarding/remitter`,
    woocommerce: `woocommerce/onboarding/remitter`,
    prestashop: `prestashop/onboarding/remitter`,
    vtex: `vtex/onboarding/locations`,
  };
  const btnTextByEcommerce = ecommerceSelected === 'vtex' ? 'Continuar' : isInsidePanel ? 'Guardar' : 'Continuar';
  const shouldDisable =
    (form.values.defaultDispatchType === 'home' && !isOneDaySelected) ||
    (form.values.defaultDispatchType === 'store' && !form.values.defaultStoreId) ||
    (form.values.defaultDispatchType !== 'home' && form.values.defaultDispatchType !== 'store');

  const previousRouteByEcommerce =
    ecommerceSelected === 'vtex'
      ? isInsidePanel
        ? `/vtex/panel/locations`
        : `/vtex/onboarding/locations`
      : !isInsidePanel && `/${routesByEcommerce[ecommerceSelected]}`;

  if (isLoadingStores)
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="spinner-grow spinner-grow-sm" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  return (
    <form id={`${styles.form_wrapper}`} onSubmit={form.onSubmit((values) => saveDispatchConfig(values))}>
      <div className={`${styles.form_container}`}>
        {!isHome && (
          <div className={`${styles.select_wrapper}`}>
            <InputsSelect
              value={form.values.defaultStoreId}
              id="defaultStoreId"
              labelTxt={'Sucursal o agente oficial más cercano a tu código postal *'}
              placeholder="Seleccionar..."
              onChangeFn={handleSelectChange}
              resultValidation={form.errors.defaultStoreId ? 'is_invalid' : ''}
              arrayList={storeList}
              previouslySelected={form.values.defaultStoreId}
            />
            <TooltipComp>
              <span>
                En caso que no se hayan podido entregar los pedidos, serán devueltos a la sucursal central de OCA
                ubicada en Av. Vélez Sarsfield 1860.
              </span>
            </TooltipComp>
          </div>
        )}

        <div className="mt-4 mt-xxl-5">
          <SectionTitles
            titleTxt="Dirección de despacho por defecto para tus envíos"
            isMain={false}
            subTxt="Existen dos opciones de despacho para elegir: Domicilio y Sucursal. Si prefieres que OCA retire tus pedidos directamente desde tu oficina o depósito, selecciona la opción de Domicilio. Si prefieres visitar una sucursal de OCA para despachar tus pedidos, selecciona Sucursal. Recuerda que siempre puedes modificar esta información más adelante al crear tus envíos."
          />
          <OriginInputs form={form} handleChange={handleRadioChange} selectedStoreAddress={selectedStoreAddress} />
        </div>
        {form.values.defaultDispatchType === 'home' && (
          <DaysAndTimeInputsGroup form={form} handleChange={handleRadioChange} handleTime={handleDaysChange} />
        )}
      </div>
      <Navigation
        linkHref={previousRouteByEcommerce}
        btnType="submit"
        btnTxt={btnTextByEcommerce}
        linkTxt="Volver"
        btnSpinner={isLoading}
        btnDisabled={shouldDisable}
      />
    </form>
  );
};

export default DispatchForm;
