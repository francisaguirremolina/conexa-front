interface ILocations {
  locations: SingleLocation[];
}
export interface InitialState {
  locations: SingleLocation[];

  locationsStateSetter: (locations: ILocations) => void;
}

export interface SingleLocation {
  availableForDelivery: boolean;
  inCoverage?: boolean;
  locationId: string;
  name: string;
  province: string;
  city: string;
  address: string;
  floor: string;
  apartment: string;
  postalCode?: string;
  zip?: string;
  firstName: string;
  lastName: string;
  companyName: string;
  cuit: string;
  countryCode?: string;
  country?: string;
}
