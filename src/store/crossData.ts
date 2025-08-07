import { devtools, persist } from 'zustand/middleware';

import type { IEcommerceId, InitialState } from '@/@types/crossData';

import identifiersInitialState from './initialState/crossData';
import { ecommerces } from '@/lib/ecommerces';

// eslint-disable-next-line import/no-mutable-exports
export let crossDataStore = (set: any) => ({
  ...identifiersInitialState,

  ecommerceSetter: (ecommerceId : IEcommerceId) => {

    const foundEcommerce = ecommerces[ecommerceId];
    set((state: InitialState) => ({
      ...state,
      ecommerce: {...foundEcommerce},
    }));
  },

});

// @ts-ignore
crossDataStore = persist(crossDataStore, { name: 'cross_data' });
crossDataStore = devtools(crossDataStore) as any;
