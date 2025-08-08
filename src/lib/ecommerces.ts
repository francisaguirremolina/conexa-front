export const ecommerces = {
  tiendanube: {
    id: 'tiendanube',
    name: 'Tiendanube',
  },
  vtex: {
    id: 'vtex',
    name: 'VTEX',
  },
  woocommerce: {
    id: 'woocommerce',
    name: 'Woocommerce',
  },
  prestashop: {
    id: 'prestashop',
    name: 'Prestashop',
  },
};

export type Ecommerce = keyof typeof ecommerces;

async function fetchRuntimeConfig() {
  const res = await fetch('/api/config');
  if (!res.ok) {
    throw new Error('Failed to load runtime config');
  }
  return res.json();
}

export async function getApiUrl(ecommerce: Ecommerce): Promise<string> {
  const config = await fetchRuntimeConfig();
  return config.urls[ecommerce] || '';
}
