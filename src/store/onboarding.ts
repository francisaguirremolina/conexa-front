import { devtools, persist } from 'zustand/middleware';

import type { InitialState } from '@/@types/onboarding';

import onboardingInitialState from './initialState/onboarding';

// eslint-disable-next-line import/no-mutable-exports
export let onboardingStore = (set: any) => ({
  ...onboardingInitialState,

  initialStateSetter: (newState: InitialState) => {
    set((state) => ({
      ...state,
      ...newState,
      servicesTypesSettings: { ...state.servicesTypesSettings, ...newState.servicesTypesSettings },
    }));
  },

  shippingSetter: (shippingSettings: InitialState) => {
    set((state) => ({
      ...state,
      shippingSettings,
    }));
  },

  remitterSetter: (remitter: InitialState) => {
    set((state) => ({
      ...state,
      remitter,
    }));
  },

  dipatchSetter: (dispatchSettings: InitialState) => {
    set((state) => ({
      ...state,
      dispatchSettings,
    }));
  },

  packageSetter: (packageSettings: InitialState) => {
    set((state) => ({
      ...state,
      packageSettings,
    }));
  },

  servicesTypesSetter: (servicesTypesSettings: InitialState) => {
    set((state) => ({
      ...state,
      servicesTypesSettings,
    }));
  },
});

// @ts-ignore
onboardingStore = persist(onboardingStore, { name: 'general' });
onboardingStore = devtools(onboardingStore) as any;
