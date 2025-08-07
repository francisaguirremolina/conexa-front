export interface InitialState {
  userId: string;
  storeName: string;
  storeUrl: string;
  packageSettings: PackageSettings;
  dispatchSettings: DispatchSettings;
  shippingSettings: ShippingSettings;
  servicesTypesSettings: ServicesTypesSettings;
  remitter: Remitter;

  initialStateSetter: (initialState: InitialState) => void;
  shippingSetter: (shippingSettings: ShippingSettings) => void;
  remitterSetter: (remitter: Remitter) => void;
  dipatchSetter: (dispatchSettings: DispatchSettings) => void;
  packageSetter: (packageSettings: PackageSettings) => void;
  servicesTypesSetter: (servicesTypesSettings: ServicesTypesSettings) => void;
}

export interface DispatchSettings {
  defaultStoreId: string;
  defaultDispatchType: string;
  activeDays: ActiveDay[];
  defaultTimeRange: string;
}

export interface ActiveDay {
  day: number;
  active: boolean;
}

export interface PackageSettings {
  width: number;
  height: number;
  length: number;
}

export interface Remitter {
  firstName: string;
  lastName: string;
  companyName: string;
  cuit?: string;
  address: Address;
}

export interface Address {
  province: string;
  locality: string;
  number: string;
  street: string;
  floor: string;
  apartment: string;
  postalCode: string;
}

export interface ShippingSettings {
  doorToDoor: number | string;
  doorToStore: number | string;
  doorToLocker: number | string;
  storeToStore: number | string;
  storeToDoor: number | string;
  storeToLocker: number | string;
}

export interface ServicesTypesSettings {
  toDoor: boolean;
  toStore: boolean;
}

export type Services = {
  home: boolean;
  store: boolean;
};
