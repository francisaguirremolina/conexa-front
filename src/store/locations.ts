import { devtools, persist } from 'zustand/middleware';

import type { InitialState } from '@/@types/locations';

import locationsInitialState from './initialState/locations';

// eslint-disable-next-line import/no-mutable-exports
export let locationsStore = (set: any) => ({
  ...locationsInitialState,

  locationsStateSetter: ({ locations }: InitialState) => {    
    set((state) => ({
      ...state,
      locations
    }));
  },

});

// @ts-ignore
locationsStore = persist(locationsStore, { name: 'locations_list' });
locationsStore = devtools(locationsStore) as any;
