import React, { useState } from 'react';
import OnboardingService from '@/services/api/onboarding';
import { useCrossDataStore, useOnboardingStore } from '@/store';

import { PanelLayout } from '@/layouts/PanelLayout';
import AccountForm from '@/components/Onboarding/forms/AccountForm';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import LogInDataForm from '@/components/Panel/logInDataForm/LogInDataForm';
import { noVtexEcommerce } from '@/services/utils.service';

const AccountPage = () => {
  const { initialStateSetter } = useOnboardingStore();
  const [isUpdatingInitialState, setIsUpdatingInitialState] = useState(false);
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);

  const updateInitialState = async () => {
    setIsUpdatingInitialState(true);

    const { data, success }: any = await OnboardingService.getInitialState();
    if (success) {
      initialStateSetter({ ...data });
    }
    setIsUpdatingInitialState(false);
  };

  return (
    <PanelLayout>
      <div style={{ maxWidth: '90%', margin: '0 auto', height: '100%' }}>
        <SectionTitles titleTxt="Datos de tu cuenta" />

        <LogInDataForm isInsidePanel={true} updateOtherTabsInfo={updateInitialState} />

        {noVtexEcommerce(ecommerceSelected) ? (
          <>
            <SectionTitles
              titleTxt="Números de operativas"
              subTxt="A continuación, visualizarás tus operativas configuradas en tu cuenta de E-Pak."
            />
            {!isUpdatingInitialState && <AccountForm isInsidePanel={true} />}
          </>
        ) : (
          <>
            <SectionTitles
              titleTxt="Números de operativas"
              subTxt="Configura al menos 1 operativa. Las vas a encontrar en tu cuenta de E-Pak."
            />
            {/* <AccountContainer isInsidePanel={true} /> */}
            <AccountForm isInsidePanel={true} />
          </>
        )}
      </div>
    </PanelLayout>
  );
};

export default AccountPage;
