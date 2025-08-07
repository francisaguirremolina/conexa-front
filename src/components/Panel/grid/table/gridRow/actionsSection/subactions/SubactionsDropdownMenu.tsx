import React, {FC} from 'react';
import PanelService from '@/services/api/panel';

import ButtonSmall from '@/components/units/Button';
import { FiTrash2 } from 'react-icons/fi';
// import { SlRefresh } from 'react-icons/sl';

import styles from './subactionsDropdownMenu.module.sass';
import styleBtn from '../../../../../../units/button.module.sass';

interface Props{
  orderId: string;
  updateTable: () => void;
  handleClose: () => void;
  showLoader: (e: boolean) => void;
}

const SubactionsDropdownMenu: FC<Props> = ({ orderId, updateTable, handleClose, showLoader }) => {

  // const handleRetryCreation = async() => {
  //   showLoader(true);
  //   setTimeout(() => {
  //     showLoader(false);
  //   }, 4000);
  //   const result: any = await PanelService.fulfillOrders({ orderIds: [orderId] });
  //   if(result.success){
  //     updateTable();
  //     handleClose();
  //   }
  // }

  const handleCancellation = async() => {
    showLoader(true);
    setTimeout(() => {
      showLoader(false);
    }, 4000);
    const result: any = await PanelService.cancelOrders({ orderId: orderId });
    if(result.success){
      updateTable();
      handleClose();
    }
  }

  return (
    <div className={styles.subactions_container}>
      <ul className={styles.subactions_list}>
        {/* <li className={styles.subactions_item}>
          <ButtonSmall
            type="button"
            btnTxt="Volver a crear"
            showSpinner={false}
            isDisabled={false}
            onClickFn={handleRetryCreation}
            extraClass={styleBtn.btn_link}
            icon={<SlRefresh />}
          />
        </li> */}
        <li className={styles.subactions_item}>
          <ButtonSmall
            type="button"
            btnTxt="Cancelar orden"
            showSpinner={false}
            isDisabled={false}
            onClickFn={handleCancellation}
            extraClass={styleBtn.btn_link}
            icon={<FiTrash2 />}
          />
        </li>
      </ul>
    </div>
  );
};

export default SubactionsDropdownMenu;
