import React from 'react';

import { PanelLayout } from '@/layouts/PanelLayout';
import RemitterForm from '@/components/Onboarding/forms/RemitterForm';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';

const index = () => {
  return (
    <PanelLayout>
      <div style={{ maxWidth: '90%', margin: '0 auto', height: "100%" }}>
        <SectionTitles titleTxt="Datos del remitente" />
        <RemitterForm isInsidePanel={true} />
      </div>
    </PanelLayout>
  );
};

export default index;
