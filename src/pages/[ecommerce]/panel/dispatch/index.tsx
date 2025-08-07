import React from 'react';

import { PanelLayout } from '@/layouts/PanelLayout';
import DispatchForm from '@/components/Onboarding/forms/DispatchForm';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import { useCrossDataStore } from '@/store';

const Index = () => {
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);
  return (
    <PanelLayout>
      <div style={{ maxWidth: '90%', margin: '0 auto', height: '100%' }}>
        <SectionTitles
          titleTxt="Configura tus despachos"
          subTxt={ecommerceSelected === 'vtex' ? 'Recuerda que al editar la configuración de un muelle, esta modificación solo impactará en las nuevas órdenes. Las órdenes existentes asociadas a ese muelle mantendrán la configuración anterior.' :"Recuerda que podrás modificar estos datos antes de crear tus etiquetas."}
        />
        <DispatchForm isInsidePanel={true} />
      </div>
    </PanelLayout>
  );
};

export default Index;
