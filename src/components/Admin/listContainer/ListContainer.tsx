import React, { useState, useEffect, FC } from 'react';
import { OrderData } from '@/@types/admin';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import ButtonSmall from '@/components/units/Button';
import OrderItems from '../orderItems/OrderItems';
import Link from 'next/link';

import styles from './listContainer.module.sass';
import styleBtn from '../../units/button.module.sass';
import { useCrossDataStore } from '@/store';

interface Props {
  ordersList: OrderData[];
  setToPrintOrders: () => void;
  userIdNumber: string;
  printSingleOrder: (orderNumber: number) => Promise<void>;
}

const ListContainer: FC<Props> = ({ ordersList, setToPrintOrders, userIdNumber, printSingleOrder }) => {
  const { ecommerce } = useCrossDataStore();
  const [titlesText, setTitlesText] = useState({
    mainTxt: '',
    subTxt: '',
  });

  const createOrdersIsFailed = ordersList.some((order) => order.error);

  const validateWording = () => {
    if (createOrdersIsFailed) {
      setTitlesText({
        mainTxt: 'No se crearon etiquetas.',
        subTxt: 'Revisa que el medio de envío asociado a la orden sea OCA.',
      });
    } else {
      if (ordersList.every((order) => order.success)) {
        setTitlesText({
          mainTxt: 'Todas tus etiquetas fueron creadas.',
          subTxt: 'A continuación podrás ver el detalle de cada una de ellas.',
        });
      }
    }
  };

  useEffect(() => {
    validateWording();
  }, [ordersList]);

  return (
    <div className={`${styles.not_created_container}`}>
      <div className={`${styles.text_wrapper}`}>
        <SectionTitles titleTxt={`${titlesText.mainTxt}`} subTxt={`${titlesText.subTxt}`} isCentered />
      </div>
      <ul className={`${styles.admin_orders_list}`}>
        {ordersList.map((item: OrderData, index) => (
          <li className={`${styles.admin_orders_item}`} key={index}>
            <OrderItems
              isCreated={item.success}
              orderNumber={item.orderNumber}
              typeError={item.error}
              printSingleOrder={printSingleOrder}
            />
          </li>
        ))}
      </ul>
      <div className={`${styles.btns_wrapper} ${createOrdersIsFailed && 'justify-content-center'}`}>
        {!createOrdersIsFailed && (
          <ButtonSmall
            type="button"
            btnTxt="Volver a descargar todas"
            onClickFn={setToPrintOrders}
            extraClass={styleBtn.btn_link}
          />
        )}
        <Link href={`/${ecommerce.id}/panel/orders?userId=${userIdNumber}`}>
          <a className={`btn btn-primary ${styleBtn.btn_primary}`}>Ir al panel de órdenes</a>
        </Link>
      </div>
    </div>
  );
};

export default ListContainer;
