/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  output: 'standalone',
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: false,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    API_URL_TIENDANUBE: process.env.API_URL_TIENDANUBE,
    API_URL_VTEX: process.env.API_URL_VTEX,
    API_URL_WOOCOMMERCE: process.env.API_URL_WOOCOMMERCE,
    API_URL_PRESTASHOP: process.env.API_URL_PRESTASHOP,
    ECOMMERCE: process.env.ECOMMERCE,
    CRYPTOJS_SECRET_KEY: process.env.CRYPTOJS_SECRET_KEY,
    HOSTNAME: process.env.HOSTNAME,
  },
});
