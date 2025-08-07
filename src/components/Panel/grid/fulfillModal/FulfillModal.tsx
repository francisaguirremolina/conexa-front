import React, { useEffect, useState, FC } from 'react';
import PanelService from '@/services/api/panel';
import ButtonSmall from '@/components/units/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import AbstractSection from './abstractSection/AbstractSection';
import EditDestination from './editionForms/destinationForm/EditDestination';
import EditOrigin from './editionForms/originForm/EditOrigin';
import EditPackage from './editionForms/packageForm/EditPackage';
import EditRemitter from './editionForms/remitterForm/EditRemitter';
import Skeleton from 'react-loading-skeleton';

import styles from './fulfillModal.module.sass';
import ReceiptForm from './editionForms/receiptForm/ReceiptForm';
import { useCrossDataStore } from '@/store';

interface Props {
  show: boolean;
  handleClose: () => void;
  updateTable: () => void;
  orderId: string;
  orderNumber: string;
  isReadOnly?: boolean;
}

const FulfillModal: FC<Props> = ({ show, handleClose, updateTable, orderId, orderNumber, isReadOnly = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFulfillmentLoading, setIsFulfillmentLoading] = useState(false);
  const [originalInfo, setOriginalInfo] = useState<any>({});
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);
  const [isPassingValuesSum, setIsPassingValuesSum] = useState(true);
  const [invalidSizes, setInvalidSizes] = useState(false);

  const validOrder = ecommerceSelected === 'vtex' ? orderNumber : orderId;

  const getOrderInfo = async () => {
    setIsLoading(true);
    const result: any = await PanelService.getSingleOrder(orderId);
    if (result.success) {
      setOriginalInfo(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getOrderInfo();
  }, []);

  const editData = async (values) => {
    setIsLoading(true);
    const result: any = await PanelService.editSingleOrder(values, orderId);
    if (result.success) {
      updateTable();
      handleClose();
    }
    setIsLoading(false);
  };

  const fulfillOrder = async () => {
    try{
      if (isFulfillmentLoading) return;
      setIsFulfillmentLoading(true);
      const result: any = await PanelService.fulfillNewOrders({ orderIds: [validOrder] });
      if (result.success) {
        updateTable();
        handleClose();
      }
    } finally {
      setIsFulfillmentLoading(false);
    }
  };

  useEffect(()=> {
    const sum = Number(originalInfo.packageData?.width) + Number(originalInfo.packageData?.height) + Number(originalInfo.packageData?.length);
    const result = sum > 400;
    setInvalidSizes(result);
  }, [originalInfo])

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" id={`${styles.fulfill_modal}`}>
      <Offcanvas.Header closeButton className={`${styles.offcanvas_header}`}>
        <Offcanvas.Title className={`${styles.offcanvas_title}`}>Cerrar</Offcanvas.Title>
      </Offcanvas.Header>
      {!isLoading ? (
        <Offcanvas.Body className={`${styles.offcanvas_body}`}>
          <AbstractSection orderData={originalInfo} isLoading={isLoading} />

          <EditRemitter formInfo={originalInfo} saveChanges={editData} isLoading={isLoading} isReadOnly={isReadOnly} />

          <EditOrigin formInfo={originalInfo} saveChanges={editData} isLoading={isLoading} />

          <EditDestination formInfo={originalInfo} saveChanges={editData} isLoading={isLoading} />

          <EditPackage formInfo={originalInfo} saveChanges={editData} isLoading={isLoading} isReadOnly={isReadOnly} isPassingValuesSum={isPassingValuesSum} setIsPassingValuesSum={setIsPassingValuesSum} />

          { ['tiendanube', 'vtex'].includes(ecommerceSelected) && <ReceiptForm formInfo={originalInfo} saveChanges={editData} isLoading={isLoading} isReadOnly={isReadOnly} /> }

          {!isReadOnly && (
            <div className={`${styles.fulfill_body_module} ${styles.submit_btn}`}>
              <ButtonSmall
                type="button"
                btnTxt="Crear orden"
                onClickFn={fulfillOrder}
                showSpinner={isFulfillmentLoading}
                isDisabled={invalidSizes || !isPassingValuesSum || isFulfillmentLoading}
                extraClass="block"
              />
            </div>
          )}
        </Offcanvas.Body>
      ) : (
        <Skeleton count={1} height={10} style={{ margin: '10px' }} />
      )}
    </Offcanvas>
  );
};

export default FulfillModal;
