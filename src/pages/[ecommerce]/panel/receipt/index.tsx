import React from 'react';

import { PanelLayout } from '@/layouts/PanelLayout';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import ReceiptForm from '@/components/Panel/receiptForm/ReceiptForm';

const index = () => {
  return (
    <PanelLayout>
      <div style={{ maxWidth: '90%', margin: '0 auto', height: '100%' }}>
        <div className="mb-4">
          <SectionTitles titleTxt="Configuración avanzada" />
        </div>
        <SectionTitles
          titleTxt="Activar remito"
          subTxt="Junto con la etiqueta del envío se imprimirá un remito con el detalle de la orden."
        />
        <ReceiptForm />
      </div>
    </PanelLayout>
  );
};

export default index;
