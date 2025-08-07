import React, { useEffect, useState, FC } from 'react';
import { OrderDetails } from '@/@types/panel';
import { packageSizeFormatter } from '@/services/onboarding.service';
import { validateBeforeClosingDropdown } from '@/services/grid.service';

import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import SetterPackage from './setterPackage/SetterPackage';

import styles from '../gridRow.module.sass';
import styleBtn from '../../../../../units/button.module.sass';

interface Props {
  orderInfo: OrderDetails;
  clickedTarget: string;
  updateTable: () => void;
}

const PackageSection: FC<Props> = ({ orderInfo, clickedTarget, updateTable }) => {
  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [sectionTitle, setSectionTitle] = useState('');

  const setPackageCategory = () => {
    const size = `${orderInfo.packageSettings?.width}x${orderInfo.packageSettings?.height}x${orderInfo.packageSettings?.length}`;
    if (size === '20x20x10' || size === '50x40x10' || size === '40x30x15') {
      setSectionTitle('Caja OCA');
    } else {
      setSectionTitle('Personalizado');
    }
  };

  useEffect(() => {
    setPackageCategory();
  }, []);

  useEffect(() => {
    validateBeforeClosingDropdown(
      clickedTarget,
      `dropdown-package-${orderInfo.orderId}`,
      packageModalOpen,
      setPackageModalOpen,
    );
  }, [clickedTarget]);

  return (
    <li className={styles.cell_package}>
      <button
        className={`${styles.gridRow_btn_dropdown} ${packageModalOpen ? styles.selected : ''} ${orderInfo.trackingStatus !== 'PENDING' && styleBtn.common_btn_disabled}`}
        type="button"
        onClick={() => setPackageModalOpen(!packageModalOpen)}
        id={`dropdown-package-${orderInfo.orderId}`}
        disabled={orderInfo.trackingStatus !== 'PENDING'}
      >
        <div className="d-flex justify-content-between align-items-center" id={`dropdown-package-${orderInfo.orderId}`}>
          <p id={`dropdown-package-${orderInfo.orderId}`}>{sectionTitle}</p>
          {orderInfo.trackingStatus === 'PENDING' && (
            <>
              {packageModalOpen ? (
                <FiChevronUp size={16} id={`dropdown-package-${orderInfo.orderId}`} />
              ) : (
                <FiChevronDown size={16} id={`dropdown-package-${orderInfo.orderId}`} />
              )}
            </>
          )}
        </div>
      </button>
      <p className={styles.secondary}>{packageSizeFormatter(orderInfo.packageSettings)}</p>
      {packageModalOpen && (
        <SetterPackage orderInfo={orderInfo} handleClose={() => setPackageModalOpen(false)} updateTable={updateTable} />
      )}
    </li>
  );
};

export default PackageSection;
