const initialState = {
  userId: '',
  storeName: '',
  storeUrl: '',
  packageSettings: {
    width: 0,
    height: 0,
    length: 0,
  },
  dispatchSettings: {
    defaultStoreId: '',
    defaultDispatchType: 'store',
    activeDays: [
      { day: 1, active: true },
      { day: 2, active: true },
      { day: 3, active: true },
      { day: 4, active: true },
      { day: 5, active: true },
    ],
    defaultTimeRange: '1',
  },
  shippingSettings: {
    doorToDoor: 0,
    doorToStore: 0,
    doorToLocker: 0,
    storeToStore: 0,
    storeToDoor: 0,
    storeToLocker: 0,
  },
  servicesTypesSettings: {
    toStore: true,
    toDoor: true,
  },
  remitter: {
    firstName: '',
    lastName: '',
    companyName: '',
    cuit: '',
    address: {
      province: '',
      locality: '',
      number: '',
      street: '',
      floor: '',
      apartment: '',
      postalCode: '',
    },
  },
};

export default initialState;
