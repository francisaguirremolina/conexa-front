import React, { useEffect } from 'react';
import OnboardingService from '@/services/api/onboarding';
import initialState from '@/store/initialState/onboarding';
import { useCrossDataStore, useOnboardingStore } from '@/store';

import { PanelLayout } from '@/layouts/PanelLayout';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import GridContainer from '@/components/Panel/grid/gridContainer/GridContainer';
import { extractInfoFromCookies, manuallyShowError } from '@/services/utils.service';
import { useRouter } from 'next/router';
import PanelService from '@/services/api/panel';

const errorTracking = {
  packageSettings: 'Debes completar las dimensiones de tus paquetes antes de poder utilizar la app.',
  shippingSettings: 'Debes revisar tu método de despacho u operativas.',
  accountSettings: 'Debes configurar tus operativas.',
  remitterSettings: 'Debes completar tus datos de remitente.',
  cuit: 'Detectamos un problema con tu CUIT configurado. Por favor escribinos a atencionclientes@oca.com.ar',
};

const Orders = () => {
  const { initialStateSetter } = useOnboardingStore();
  const savedInitialStateUrl = useOnboardingStore((state) => state.storeUrl);
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);
  const router = useRouter();
  const userId = extractInfoFromCookies('userId');

  if (userId === undefined) {
    const path =
      ecommerceSelected === 'vtex' ? `/${ecommerceSelected}/welcome` : `/${ecommerceSelected}/onboarding/sign-in`;
    router.push(path);
    manuallyShowError('El usuario no se encuentra registrado.');
  }

  const fetchInitialState = async () => {
    // @ts-ignore
    const { data, success } = await OnboardingService.getInitialState();
    if (Object.keys(data).length === 0) {
      // @ts-ignore
      initialStateSetter(initialState);
    } else {
      // @ts-ignore
      initialStateSetter({ ...data });
    }
  };

  useEffect(() => {
    if (!savedInitialStateUrl && userId) {
      fetchInitialState();
    }
    if (ecommerceSelected === 'tiendanube') {
      getPendingSettings();
    }
  }, []);

  const getPendingSettings = async () => {
    const {
      data: { pendingSettings },
    } = await PanelService.getPendingSettings();
    const errorsToShow = pendingSettings.map((setting) => errorTracking[setting]);
    if (errorsToShow.length > 0) {
      const errorMessages = errorsToShow.join('\n');
      manuallyShowError(
        errorMessages || 'Ocurrió un error inesperado. Por favor, escribinos a atencionclientes@oca.com.ar',
      );
    }
  };

  return (
    <PanelLayout>
      <SectionTitles titleTxt="Órdenes" subTxt="Consultá los datos de tus órdenes y envíos." />
      <GridContainer />
    </PanelLayout>
  );
};

export default Orders;
