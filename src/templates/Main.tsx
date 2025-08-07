import { AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

import { NotificationAlert } from '@/components/alert/NotificationAlert';
import { useModalsStore } from '@/store';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const { notification, closeNotification } = useModalsStore((state) => state);

  return (
    <div>
      {props.meta}
      {props.children}

      {/* Global Modals */}

      <AnimatePresence>
        {notification.visible && <NotificationAlert type={notification.type} message={notification.message} onClose={closeNotification} length={notification.length || 0} />}
      </AnimatePresence>
    </div>
  );
};

export { Main };