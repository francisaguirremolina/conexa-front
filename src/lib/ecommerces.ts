const env = (key: string) => process.env[key];

export const ecommerces = {
  tiendanube: {
    id: 'tiendanube',
    name: 'Tiendanube',
    apiUrl: env('API_URL_TIENDANUBE'),
  },
  vtex: {
    id: 'vtex',
    name: 'VTEX',
    apiUrl: env('API_URL_VTEX'),
  },
  woocommerce: {
    id: 'woocommerce',
    name: 'Woocommerce',
    apiUrl: env('API_URL_WOOCOMMERCE'),
  },
  prestashop: {
    id: 'prestashop',
    name: 'Prestashop',
    apiUrl: env('API_URL_PRESTASHOP'),
  },
};

export type Ecommerce = keyof typeof ecommerces;
