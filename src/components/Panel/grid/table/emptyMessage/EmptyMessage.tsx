import React, {FC} from 'react';

import styles from '../table.module.sass';

interface Props{
  msgType?: string;
}

export const EmptyMessage: FC<Props> = ({ msgType = 'notFound' }) => {
  const typeOfMsg = {
    notFound: {
      message: 'No encontramos órdenes que coincidan con tu búsqueda',
      extraInfo: 'Revisa que la información sea la correcta y vuelve a intentarlo.',
    },
    emptyList: {
      message: 'Todavía no hay órdenes en tu tienda',
      extraInfo: 'Cuando recibas una orden, podrás consultar los detalles en esta sección',
    },
  };

  return (
    <div className={styles.empty_msg}>
      <h5 className={styles.empty_msg_title}>{typeOfMsg[msgType].message}</h5>
      <p className={styles.empty_msg_text}>{typeOfMsg[msgType].extraInfo}</p>
    </div>
  );
};
