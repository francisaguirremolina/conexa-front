import React from 'react';

import { PanelLayout } from '@/layouts/PanelLayout';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import RemitterForm from '@/components/Onboarding/forms/RemitterForm';

const Create = () => {
  return (
    <PanelLayout>
      <div style={{ maxWidth: '90%', margin: '0 auto', height: '100%' }}>
        <SectionTitles titleTxt="Crear muelle" />
        <RemitterForm />
      </div>
    </PanelLayout>
  );
};

export default Create;
