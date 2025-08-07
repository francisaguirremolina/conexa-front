import { devtools } from 'zustand/middleware';

import modalsInitialState from './initialState/modals';

// eslint-disable-next-line import/no-mutable-exports
export let modalsStore = (set) => ({
  ...modalsInitialState,
  setNotification: (notification) => {
    setTimeout(() => {
      set((state) => ({
        ...state,
        notification: { ...state.notification, visible: false },
      }));
    }, notification.showTime ?? 6500);

    return set((state) => ({
      ...state,
      notification: { ...state.notification, ...notification, visible: true },
    }));
  },

  closeNotification: (notification) => {
    return set((state) => ({
      ...state,
      notification: { ...state.notification, ...notification, visible: false },
    }));
  },
});

modalsStore = devtools(modalsStore) as any;
