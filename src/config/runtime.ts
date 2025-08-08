export const runtimeConfig = {
  urls: {
    tiendanube: process.env['NEXT_PUBLIC_API_URL_TIENDANUBE'] ?? '',
    vtex: process.env['NEXT_PUBLIC_API_URL_VTEX'] ?? '',
    woocommerce: process.env['NEXT_PUBLIC_API_URL_WOOCOMMERCE'] ?? '',
    prestashop: process.env['NEXT_PUBLIC_API_URL_PRESTASHOP'] ?? '',
  },
};

export type RuntimeConfig = typeof runtimeConfig;
