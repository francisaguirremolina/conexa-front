import { PackageSettings } from '@/@types/onboarding';

export const dateFormatter = (dateInfo: string, isDateOfCreation: boolean = true) => {
  const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const orderDate = new Date(dateInfo);
  if (isDateOfCreation) {
    // @ts-ignore
    return `${(dayNames[orderDate.getDay()]).slice(0, 2)} - ${orderDate.getDate()}/${(monthNames[orderDate.getMonth()]).slice(0, 3)}/${orderDate.getFullYear().toString().slice(2, 4)}`
  }
  // @ts-ignore
  return `${orderDate.getDate()}/${(monthNames[orderDate.getMonth()]).slice(0, 3)}/${orderDate.getFullYear().toString().slice(2, 4)}`
}

export const packageSizeFormatter = (packageInfo: { width: number, height: number, length: number } = { width: 0, height: 0, length: 0 }, unit: string = "") => {
  if (unit) {
    return `${packageInfo.width}${unit} x ${packageInfo.height}${unit} x ${packageInfo.length}${unit}`
  }
  return `${packageInfo.width} x ${packageInfo.height} x ${packageInfo.length}`
}

export const loadPreSavedData = (packageSettings: any, fixedPackagesInfo: any, setPredefinedSize: (e: any) => void, setFixedValueSelected: (e: any) => void, setfixedOptionSelected: (e: any) => void, form: any) => {
  if (!packageSettings?.width && !packageSettings?.height && !packageSettings?.length) {
    setPredefinedSize('fixed');
    setFixedValueSelected({
      width: String(10),
      height: String(10),
      length: String(10),
    });
    setfixedOptionSelected('S');
    return
  }
  const joinedSize: string | any = Object.values(packageSettings).join('x');
  if (
    joinedSize.includes(fixedPackagesInfo[0]?.size) ||
    joinedSize.includes(fixedPackagesInfo[1]?.size) ||
    joinedSize.includes(fixedPackagesInfo[2]?.size)
  ) {
    setPredefinedSize('fixed');
    setFixedValueSelected({
      width: String(packageSettings.width),
      height: String(packageSettings.height),
      length: String(packageSettings.length),
    });
    if (joinedSize.includes(fixedPackagesInfo[0]?.size)) {
      // @ts-ignore
      setfixedOptionSelected(fixedPackagesInfo[0]?.id);
    }
    if (joinedSize.includes(fixedPackagesInfo[1]?.size)) {
      // @ts-ignore
      setfixedOptionSelected(fixedPackagesInfo[1]?.id);
    }
    if (joinedSize.includes(fixedPackagesInfo[2]?.size)) {
      // @ts-ignore
      setfixedOptionSelected(fixedPackagesInfo[2]?.id);
    }
  } else {
    setPredefinedSize('personalized');
    setfixedOptionSelected('');
    form.setFieldValue('width', String(packageSettings.width));
    form.setFieldValue('height', String(packageSettings.height));
    form.setFieldValue('length', String(packageSettings.length));
  }
};

export const preparePackageBody = (predefinedSize: any, fixedValueSelected: any, values: any) => {
  let body: PackageSettings = { width: 0, height: 0, length: 0 };
  if (predefinedSize === 'fixed') {
    body = {
      width: Number(fixedValueSelected.width),
      height: Number(fixedValueSelected.height),
      length: Number(fixedValueSelected.length),
    };
  } else {
    body = { width: Number(values.width), height: Number(values.height), length: Number(values.length) };
  }
  return body
}

export const extractIdFromRoute = (route: string) => {
  const segments = route.split('/');
  return segments[segments.length - 1];
};

export const findLocationAndIndex = (fullList: any[], valueFromArr: string, referenceValue: string | any, locationSetter: (e: any) => void, indexSetter: (e: any) => void) => {
  let singleLocSelected = fullList.find((loc) => loc[valueFromArr] === referenceValue);
  let singleLocIndex = fullList.findIndex((loc) => loc[valueFromArr] === referenceValue);
  locationSetter(singleLocSelected);
  indexSetter(singleLocIndex);
}