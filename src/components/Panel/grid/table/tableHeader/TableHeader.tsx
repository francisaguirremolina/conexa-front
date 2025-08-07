import React, {useEffect, useState, FC} from 'react';
import { formatCheckboxSelection } from '@/services/grid.service';
import { OrderDetails, OrdersSelectedTypes } from '@/@types/panel';

import CheckboxButton from '@/components/units/CheckboxButton';
import { FiInfo } from 'react-icons/fi';

import styles from './tableHeader.module.sass';
import { useCrossDataStore } from '@/store';

interface Props{
  ordersList: OrderDetails[];
  ordersSelected: OrdersSelectedTypes[];
  setOrdersSelected: (e: any) => void;
  showReference: () => void;
}

const TableHeader: FC<Props> = ({ ordersList, ordersSelected, setOrdersSelected, showReference }) => {
  const [isAllSelected, setIsAllSelected] = useState(false);
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);

  useEffect(() => {    
    if(ordersSelected.length !== ordersList.length || ordersList.length === 0){
      setIsAllSelected(false);
    } else {
      setIsAllSelected(true);
    }    
  }, [ordersSelected])
  
  const handleSelectAll = (e) => {
    setIsAllSelected(e.target.checked)
    if(e.target.checked===true){
      const formattedReference = ordersList.map( (ord) => formatCheckboxSelection(ord))
      setOrdersSelected([...formattedReference])
    } else {
      setOrdersSelected([])
    }
  }

  return (
    <ul className={`${styles.table_header} ${styles.black_semibold} ${ ['tiendanube', 'vtex'].includes(ecommerceSelected) ? styles['columns-tn'] : ''} px-4`}>
      <li>
        <CheckboxButton
          id={`${styles.select_all_orders}`}
          value="all"
          onChangeFn={handleSelectAll}
          checked={isAllSelected}
          disabled={false}
          extraClassName="test"
        />
      </li>
      <li>Origen</li>
      <li>Destinatario</li>
      { !['tiendanube', 'vtex'].includes(ecommerceSelected) && <li>Paquete</li>}
      <li>Destino</li>
      <li className={styles.header_status}>
        Estatus OCA
        <button
          type="button"
          onClick={showReference}
        >
          <FiInfo size={14} />
        </button>
      </li>
      <li>Más acciones</li>
    </ul>
  );
};

export default TableHeader;
