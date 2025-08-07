import React, { useState, useEffect, FC } from 'react';
import { OrderDetails } from '@/@types/panel';
import { printLabel, validateBeforeClosingDropdown } from '@/services/grid.service';
import { ButtonSmall } from '@/components/units/Button';
import SubactionsDropdownMenu from './subactions/SubactionsDropdownMenu';
import FulfillModal from '../../../fulfillModal/FulfillModal';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiEye, FiPrinter } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import PanelService from '@/services/api/panel';

import styleBtn from '../../../../../units/button.module.sass';
import styles from '../gridRow.module.sass';
import { Spinner } from 'react-bootstrap';
import { useCrossDataStore } from '@/store';

interface Props {
  orderInfo: OrderDetails;
  updateTable: () => void;
  clickedTarget: string;
  setShowLoadingModal: (e: boolean) => void;
}

const ActionsSection: FC<Props> = ({ orderInfo, updateTable, clickedTarget, setShowLoadingModal }) => {
  const { ecommerce } = useCrossDataStore();
  const [isSubactionsOpen, setIsSubactionsOpen] = useState(false);
  const [isFulfillModalOpen, setIsFulfillModalOpen] = useState(false);
  const [isNoEditionModal, setIsNoEditionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isEcommerceVtex = ecommerce.id === 'vtex';
  const validOrder = isEcommerceVtex ? orderInfo.orderNumber : orderInfo.orderId;

  useEffect(() => {
    validateBeforeClosingDropdown(
      clickedTarget,
      `dropdown-actions-${orderInfo.orderId}`,
      isSubactionsOpen,
      setIsSubactionsOpen,
    );
  }, [clickedTarget]);

  const setToPrintOrder = async () => {
    try {
      setIsLoading(true);
      const result: any = await PanelService.printOrders({ orderIds: [validOrder] });
      if (result?.success) {
        printLabel(result?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {orderInfo.trackingStatus !== 'PENDING' ? (
        <>
          <li className={`${styles.cell_actions} ${orderInfo.trackingStatus === 'ERROR' && styles.centered_actions}`}>
            <button
              type="button"
              onClick={() => {
                setIsNoEditionModal(true);
                setIsFulfillModalOpen(true);
              }}
            >
              <FiEye size={18} />
            </button>
            {orderInfo.trackingUrl && (
              <Link href={orderInfo.trackingUrl}>
                <a target="_blank" rel="noopener noreferrer">
                  <Image src="/assets/images/tracking-icon.svg" height={18} width={18} alt="tracking icon" />
                </a>
              </Link>
            )}
            {orderInfo.trackingStatus !== 'ERROR' && (
              <button
                type="button"
                onClick={setToPrintOrder}
                id={`dropdown-actions-${orderInfo.orderId}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner animation="border" role="status" size="sm">
                    <span className="visually-hidden"></span>
                  </Spinner>
                ) : (
                  <FiPrinter size={18} />
                )}
              </button>
            )}
            {orderInfo.trackingStatus !== 'ERROR' && (
              <div className={styles.actions_wrapper} id={`dropdown-actions-${orderInfo.orderId}`}>
                <button
                  type="button"
                  onClick={() => setIsSubactionsOpen(!isSubactionsOpen)}
                  id={`dropdown-actions-${orderInfo.orderId}`}
                >
                  <BsThreeDotsVertical size={18} id={`dropdown-actions-${orderInfo.orderId}`} />
                </button>
                {isSubactionsOpen && (
                  <SubactionsDropdownMenu
                    orderId={orderInfo.orderId}
                    updateTable={updateTable}
                    handleClose={() => setIsSubactionsOpen(false)}
                    showLoader={setShowLoadingModal}
                  />
                )}
              </div>
            )}
          </li>
        </>
      ) : (
        <li className={styles.cell_button}>
          <ButtonSmall
            type="button"
            btnTxt="Revisar envío"
            showSpinner={false}
            isDisabled={false}
            onClickFn={() => {
              setIsNoEditionModal(false);
              setIsFulfillModalOpen(true);
            }}
            extraClass={`${styleBtn.btn_link}`}
          />
        </li>
      )}
      {isFulfillModalOpen && (
        <FulfillModal
          show={isFulfillModalOpen}
          handleClose={() => setIsFulfillModalOpen(false)}
          updateTable={updateTable}
          orderId={orderInfo.orderId}
          orderNumber={orderInfo.orderNumber}
          isReadOnly={isNoEditionModal}
        />
      )}
    </>
  );
};

export default ActionsSection;
