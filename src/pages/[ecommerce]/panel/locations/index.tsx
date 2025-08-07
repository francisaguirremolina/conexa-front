import React from 'react';

import { PanelLayout } from '@/layouts/PanelLayout';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import LocationsContainer from '@/components/Onboarding/locationsConfig/locationsContainer/LocationsContainer';

const Locations = () => {
  return (
    <PanelLayout>
      <div style={{ maxWidth: '90%', margin: '0 auto', height: '100%' }}>
        <SectionTitles
              titleTxt="Muelles"
              subTxt="Activa y vincula tu cuenta de OCA a cada tienda."
            />
        <LocationsContainer isInsidePanel={true} />
      </div>
    </PanelLayout>
  );
};

export default Locations;
