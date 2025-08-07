import { create } from 'zustand';

import type { State as ModalsState } from '../@types/modals';
import type { InitialState as OnboardingState } from '../@types/onboarding';
import type { InitialState as CrossDataState } from '../@types/crossData';
import type { InitialState as LocationsState } from '../@types/locations';
// Stores
import { modalsStore } from './modals';
import { onboardingStore } from './onboarding';
import { crossDataStore } from './crossData';
import { locationsStore } from './locations';

export const useModalsStore = create<ModalsState>(modalsStore);
// @ts-ignore
export const useOnboardingStore = create<OnboardingState>(onboardingStore);
export const useCrossDataStore = create<CrossDataState>(crossDataStore);
// @ts-ignore
export const useLocationsStore = create<LocationsState>(locationsStore);
