import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/global.css';

import type { AppProps } from 'next/app';
import { useEffect } from 'react';

function MyApp ({ Component, pageProps }: AppProps) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min");
  }, []);

  return <Component {...pageProps} />
  
};

export default MyApp;
