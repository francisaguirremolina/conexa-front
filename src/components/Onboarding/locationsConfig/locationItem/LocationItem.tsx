import Switch from '@/components/units/Switch';
import { FiChevronRight, FiMinus } from 'react-icons/fi';
import { noSpacedNameShortener, validateFullAddress } from '@/services/utils.service';

import styles from './locationItem.module.sass';
import styleInput from '../../../units/inputs.module.sass';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const LocationItem = ({ index, isInsidePanel, ecommerce, handleChange, ...location }) => {
  const [isConfigurated, setIsConfigurated] = useState(false);

  useEffect(() => {
    setIsConfigurated(location.configured);
  }, [location]);

  const [switchChecked, setSwitchChecked] = useState();

  useEffect(() => {
    setSwitchChecked(location.availableForDelivery);
  }, [location])

  const handleSwitchChange = (e) => {
    setSwitchChecked(e.target.checked);
    handleChange(e, index);
  };

  return (
    <div className={`${styles.locationItem_grid} mb-2`}>
      <Switch
        id={location.locationId}
        value={location.configured}
        checked={location.availableForDelivery}
        onChangeFn={handleSwitchChange}
        labelTxt={location.name ? noSpacedNameShortener(location.name, 31) : `Tienda ${index + 1}`}
      />
      <div className={styles.address_wrapper}>
        <h3>{validateFullAddress([location.address, location.city])}</h3>
        {isConfigurated && switchChecked && <small className={styles.success}>Tienda configurada</small>}
        {!isConfigurated && switchChecked && <small>Configuración incompleta</small>}
      </div>
      {switchChecked && (
        <Link
          href={`/${ecommerce}/${isInsidePanel ? 'panel' : 'onboarding'}/dispatch?postalCode=${
            location.postalCode
          }&locationId=${location.locationId}`}
          passHref
        >
          <a className={styles.step_subtitle}>
            Configurar <FiChevronRight />
          </a>
        </Link>
      )}
    </div>
  );
};

export const LocationItemError = ({ index, ecommerce, isInsidePanel, handleChange, ...location }) => {
  return (
    <div className={`${styles.locationItem_grid} ${styles.danger} mb-2`}>
      <div className={styles.noSwitch}>
        <FiMinus />
        <h4 className={`form-check-label ${styleInput.form_check_label} ${styleInput.label_bold}`}>
          {location.name ? noSpacedNameShortener(location.name, 31) : `Tienda ${index + 1}`}
        </h4>
      </div>
      <div className={styles.address_wrapper}>
        <h3>{validateFullAddress([location.address, location.city])}</h3>
        <small>Fuera de zona operativa</small>
      </div>
    </div>
  );
};
