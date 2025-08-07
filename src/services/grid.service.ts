import circleBlue from '../../public/assets/images/icons/statusCircles/circleBlue.svg';
import circleGray from '../../public/assets/images/icons/statusCircles/circleGray.svg';
import circleGreen from '../../public/assets/images/icons/statusCircles/circleGreen.svg';
import circleRed from '../../public/assets/images/icons/statusCircles/circleRed.svg';
import circleYellow from '../../public/assets/images/icons/statusCircles/circleYellow.svg';

export const statusTranslator = (statusName: string) => {
  const list = {
    PENDING: 'Por crear',
    CREATED: 'Creado',
    COLLECTED: 'Retirado',
    ON_ROUTE: 'En camino',
    AT_STORE: 'En sucursal',
    DELIVERED: 'Entregado',
    ERROR: 'Cancelado',
    RETURNED: 'En devolución',
  };
  return list[statusName] || '';
};

export const colorSetter = (statusName: string) => {
  const list = {
    PENDING: circleGray,
    CREATED: circleYellow,
    COLLECTED: circleBlue,
    ON_ROUTE: circleBlue,
    AT_STORE: circleBlue,
    DELIVERED: circleGreen,
    ERROR: circleRed,
    RETURNED: circleYellow,
  };
  return list[statusName] || '';
};

export const formatCheckboxSelection = (obj: any) => {
  return { orderId: obj.orderId, orderNumber: obj.orderNumber, orderStatus: obj.trackingStatus };
};

export const validateBeforeClosingDropdown = (
  clickedTarget: string,
  idToCompare: string,
  state: boolean,
  stateSetter: (e: any) => void,
) => {
  if (clickedTarget !== idToCompare) {
    if (state) {
      stateSetter(false);
    }
  }
};

// print labels

export const getInfoFromBase64 = async (base64) => {
  const meta = base64.split(',')[0];
  const rawBase64 = base64.split(',')[0].replace(/\s/g, '');
  const mime = /:([^;]+);/.exec(meta);
  const extension = /\/([^;]+);/.exec(meta);

  return {
    mime,
    extension,
    meta,
    rawBase64,
  };
};

export const convertBase64ToBlob = async (base64) => {
  const info = await getInfoFromBase64(base64);
  const sliceSize = 512;
  const byteCharacters = window.atob(info.rawBase64);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    // @ts-ignore
    byteArrays.push(new Uint8Array(byteNumbers));
  }
  return new Blob(byteArrays, { type: 'application/pdf' });
};

export const printLabel = async (labelData: any) => {
  const deliberyLabel = await convertBase64ToBlob(labelData);
  const blobUrl = URL.createObjectURL(deliberyLabel);
  window.open(blobUrl, '_blank');
};
