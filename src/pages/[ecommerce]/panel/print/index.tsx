import React from 'react';

import { PanelLayout } from '@/layouts/PanelLayout';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import PrintForm from '@/components/Panel/printForm/PrintForm';

const index = () => {
  return (
    <PanelLayout>
      <div style={{ maxWidth: '90%', margin: '0 auto', height: '100%' }}>
        <div className="mb-4">
          <SectionTitles titleTxt="Configuración avanzada" />
        </div>
        <div className="mb-4">
          <SectionTitles
            titleTxt="Configuración de impresoras"
            subTxt="Elige el formato en el cual deseas imprimir tus etiquetas. Para cambiar esta opción en el futuro, simplemente vuelve a este menú."
          />
        </div>
        <PrintForm />
      </div>
    </PanelLayout>
  );
};

export default index;
