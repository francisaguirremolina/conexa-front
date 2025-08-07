import { ecommerces } from '@/lib/ecommerces';
import { useModalsStore } from '@/store';

export const manageLoadingState = (loaderSetter: (e: any) => void, duration: number = 1500) => {
  loaderSetter(true);
  setTimeout(() => {
    loaderSetter(false);
  }, duration);
};

export const capitalizeFirstLetter = (string: any) => {
  if (string !== undefined) {
    const normalizeWord = string.toString().toLowerCase();
    return normalizeWord.charAt(0).toUpperCase() + normalizeWord.slice(1);
  }
};

export const mapDataForSelect = (listArr: any[], dataKeyForName: string, dataKeyForValue: string) => {
  return listArr.map((obj) => ({ name: obj[dataKeyForName], value: obj[dataKeyForValue] }));
};

export const mapAddressForSelect = (listArr: any[]) => {
  return listArr.map((obj) => ({
    name: `${capitalizeFirstLetter(obj.address?.street || '')} ${obj.address?.number || ''} - ${capitalizeFirstLetter(
      obj.address?.locality || obj.address?.province,
    )}`,
    value: obj.impositionCenterId,
  }));
};

export const extractInfoFromCookies = (infoKeyName: string) => {
  if (typeof document === 'undefined') {
    return null;
  }
  const allCookies = document.cookie;
  const cookiesArr = allCookies.split(' ');
  const userCookie = cookiesArr.find((el) => el.includes(infoKeyName));
  return userCookie?.split('=')[1];
};

export const manuallyShowSuccess = (successMsg: string) => {
  useModalsStore.getState().setNotification({
    message: successMsg,
    type: 'success',
  });
};

export const manuallyShowError = (errorMsg: string) => {
  useModalsStore.getState().setNotification({
    message: errorMsg,
    type: 'error',
  });
};

export const validateFullInfoComplete = (dataArr: any[], flagSetter: (e: boolean) => void) => {
  const isMissingData = dataArr.some((arrItem) => !arrItem || arrItem.toString().includes('null'));
  if (isMissingData) {
    flagSetter(false);
  } else {
    flagSetter(true);
  }
};

export const validateFullAddress = (dataArr, failedMsg = '- Dirección incompleta -') => {
  const isMissingData = dataArr.some((geoInfo) => !geoInfo || geoInfo.toString().includes('null'));
  if (isMissingData) {
    return failedMsg;
  } else {
    return dataArr.join(', ');
  }
};

export const noSpacedNameShortener = (nameString: string, finalSliceIndex: number) => {
  if (!nameString.includes(' ') && nameString.length > 10) {
    return `${nameString.slice(0, finalSliceIndex)}...`;
  }
  return nameString;
};

export const noVtexEcommerce = (ecommerceId: string) => {
  const { vtex, ...rest } = ecommerces;
  const validEcommercesIds = Object.keys(rest);
  return validEcommercesIds.includes(ecommerceId);
};

export function setLocalStorageData(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}
