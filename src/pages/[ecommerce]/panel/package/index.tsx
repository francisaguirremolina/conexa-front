import React from 'react';

import { PanelLayout } from '@/layouts/PanelLayout';
import PackageForm from '@/components/Onboarding/forms/PackageForm';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';

const index = () => {
  return (
    <PanelLayout>
      <div style={{ maxWidth: '90%', margin: '0 auto', height: '100%' }}>
        <SectionTitles
          titleTxt="Configura tu paquete"
          subTxt="Recuerda que podrás modificar estos datos antes de crear tus etiquetas"
        />
        <PackageForm isInsidePanel={true} />
      </div>
    </PanelLayout>
  );
};

export default index;
