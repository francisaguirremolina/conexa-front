import React from 'react';

import { PanelLayout } from '@/layouts/PanelLayout';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import ServicesForm from '@/components/Onboarding/forms/ServicesForm';

const index = () => {
  return (
    <PanelLayout>
      <div style={{ maxWidth: '90%', margin: '0 auto', height: "100%" }}>
        <SectionTitles
              titleTxt="Tipo de servicio"
              subTxt="Selecciona el tipo de servicio que deseas ofrecerle a tus clientes."
        />
        <ServicesForm isInsidePanel={true} />
      </div>
    </PanelLayout>
  );
};

export default index;