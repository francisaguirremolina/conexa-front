//all orders

export interface GetOrdersList {
  success: boolean;
  totalOrders: number;
  data: OrderDetails[];
}

export interface OrderDetails {
  orderId: string;
  orderNumber: string;
  creationDate: Date | string;
  trackingStatus: string;
  statusLabel?: string;
  label: string;
  defaultDispatchType: string;
  origin: Origin;
  recipient: Recipient;
  shippingAddress: ShippingAddress;
  packageSettings: PackageSettings;
  trackingUrl: string;
}

export interface Origin {
  province: string;
  locality: string;
  number: number;
  street: string;
  floor: string;
  apartment: string;
  postalCode: number;
}

export interface PackageSettings {
  width: number;
  height: number;
  length: number;
  bulks: number;
}

export interface Recipient {
  firstName: string;
  lastName: string;
  fullName: string;
  cuil: string;
}

export interface ShippingAddress {
  province: string;
  locality: string;
  number: string;
  street: string;
  floor: string;
  apartment: string;
  postalCode: string;
}


//single order

export interface GetSingleOrderResponse {
  success: boolean;
  data: Data;
}

export interface Data {
  orderId: string;
  orderNumber: number;
  items: Item[];
  totalSpent: string;
  subTotal: string;
  taxCost: string;
  shippingCost: string;
  discount: string;
  origin: OriginSingle;
  recipient: RecipientSingle;
  shippingAddress: ShippingAddressSingle;
  packageSettings: PackageSettingsSingle;
  packageData: PackageSettingsSingle;
  receiptSettings: ReceiptSettingsSingle;
}

export interface Item {
  name: string;
  price: string | number;
  quantity: number;
}

export interface OriginSingle {
  province: string;
  locality: string;
  number: number;
  street: string;
  floor: string;
  apartment: string;
  postalCode: number;
}

export interface PackageSettingsSingle {
  width: number;
  height: number;
  length: number;
  bulks: number;
}

export interface ReceiptSettingsSingle {
  isReceiptActive: boolean;
  receiptConfig: ReceiptConfig;
}

export interface ReceiptConfig {
  isOrderInfoIncluded: boolean;
  isRemitterIncluded: boolean;
  isNotesIncluded: boolean;
  isClientIdIncluded: boolean;
}

export interface RecipientSingle {
  firstName: string;
  lastName: string;
  cuil: string;
}

export interface ShippingAddressSingle {
  province: string;
  locality: string;
  number: string;
  street: string;
  floor: string;
  apartment: string;
  postalCode: string;
}

//pagination

export interface PaginationTypes {
  totalAmount: number;
  currentPage: number;
  pageSize: number;
  paginationFrom: number;
}

//selection

export interface OrdersSelectedTypes {
  orderId: string;
  orderStatus: string;
}

//filters

export interface FilterState {
  dateFrom: string;
  dateTo: string;
  status: string;
  dispatchType: string;
  sort: number;
  searchTag: string;
}

//receipt

export interface ReceiptValues{
  isOrderInfoIncluded: boolean,
  isRemitterIncluded: boolean,
  isNotesIncluded: boolean,
  isClientIdIncluded: boolean,
}

export type FetchOrders = (from?: number, limit?: number, dateFrom?: string, dateTo?: string, status?: string, dispatchType?: string, sort?: number, tag?: string) => Promise<void>