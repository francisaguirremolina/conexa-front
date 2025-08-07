export type IEcommerceId = 'tiendanube' | 'vtex' | 'woocommerce' | 'prestashop';

export type InitialState = {
  ecommerce:
  | {
    id: string;
    name: string;
    apiUrl: string;
    }
  |
  any;
  ecommerceSetter: (ecommerce: IEcommerceId) => void;
};
