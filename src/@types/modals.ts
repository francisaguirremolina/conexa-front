export type BaseModal = {
  visible: boolean;
  onClose?: () => void | any;
};

export interface Notification extends BaseModal {
  type: 'success' | 'error' | string;
  length?: number;
  message: string | string[];
  showTime?: number;
}

export type SetNotificationType = {
  message: string;
  type?: 'success' | 'error' | string;
};

export interface State {
  notification: Notification;
  setNotification: (notification: Partial<Notification>) => void;
  closeNotification: (notification: Partial<Notification>) => void;
}
