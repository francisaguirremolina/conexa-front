export const ecommerces = {
  tiendanube: {
    id: 'tiendanube',
    name: 'Tiendanube',
    apiUrl: process.env.API_URL_TIENDANUBE,
  },
  vtex: {
    id: 'vtex',
    name: 'VTEX',
    apiUrl: process.env.API_URL_VTEX,
  },
  woocommerce: {
    id: 'woocommerce',
    name: 'Woocommerce',
    apiUrl: process.env.API_URL_WOOCOMMERCE,
  },
  prestashop: {
    id: 'prestashop',
    name: 'Prestashop',
    apiUrl: process.env.API_URL_PRESTASHOP,
  },
};

export type Ecommerce = keyof typeof ecommerces;
