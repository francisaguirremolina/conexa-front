import React, { useEffect, useState, FC } from 'react';
import { OrderDetails } from '@/@types/panel';
import OnboardingService from '@/services/api/onboarding';
import PanelService from '@/services/api/panel';
import { capitalizeFirstLetter } from '@/services/utils.service';
import { validation } from '@/services/validations.service';
import { useForm } from '@mantine/form';

import ButtonSmall from '@/components/units/Button';
import { FiSearch } from 'react-icons/fi';

import styles from './storeFinder.module.sass';
import styleInput from '../../../../../../units/inputs.module.sass';
import styleBtn from '../../../../../../units/button.module.sass';

interface Props{
  orderInfo: OrderDetails; 
  handleClose: () => void;
  updateTable: () => void;
}

const StoreFinder: FC<Props> = ({ orderInfo, handleClose, updateTable }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchProcess, setIsSearchProcess] = useState(false);
    
  const form = useForm({
    initialValues: {
      postalCode: '',
    },
    validate: {
      postalCode: (value: string | any) => validation(value, "maxLength", 1, 4),
    },
  });

  const cleanUp = () => {
    form.reset();
    setSearchResults([]);
    setIsSearchProcess(false);
  };

  const handleInputChange = (e) => {
    form.setFieldValue(`postalCode`, e.target.value);
  };

  const searchStores = async(values: typeof form.values) => {
    form.validate();
    setIsSearchProcess(true);
    const result: any = await OnboardingService.getDeliveryStores(values.postalCode);
    if(result){
      // @ts-ignore
      setSearchResults(result?.data);
    }
  };

  const handleSelection = async(selectedFullInfo) => {
    const body = {
      impositionCenterId: selectedFullInfo?.impositionCenterId,
      province: selectedFullInfo.address?.province,
      locality: selectedFullInfo.address?.locality,
      number: selectedFullInfo.address?.number,
      street: selectedFullInfo.address?.street,
      floor: selectedFullInfo.address?.floor || "",
      apartment: selectedFullInfo.address?.apartment || "",
      postalCode: selectedFullInfo.address?.postalCode,
    };

    const result: any = await PanelService.editSingleOrder({ shippingAddress: { ...body }}, orderInfo.orderId);
    if(result.success){
      cleanUp();
      handleClose();
      updateTable();
    }
  };

  useEffect(() => {
    if (form.values.postalCode === '') {
      cleanUp();
    }
  }, [form.values.postalCode]);

  return (
    <div id={styles.search_modal_wrapper}>
      <form className={styles.search_wrapper} onSubmit={form.onSubmit((values) => searchStores(values))}>
        <FiSearch size={16} />
        <input
          {...form.getInputProps('postalCode')}
          onChange={handleInputChange}
          type="number"
          name="q"
          id={`dropdown-destination-${orderInfo.orderId}`}
          className={`${styles.search_input} ${styles.remove_arrow}`}
          placeholder="Ingresa un código postal"
          value={String(form.values.postalCode).replace(/^0+/, '')}
        />
      </form>
      {form.errors.postalCode && <span className={`${styleInput.invalid_msg}`}>{form.errors.postalCode}</span>}
      {searchResults.length > 0 ? (
        <ul className={styles.found_stores_list}>
          {searchResults.map((result: any, index) => (
            <li className={styles.found_stores_item} key={index} id={`dropdown-destination-${orderInfo.orderId}`}>
              <ButtonSmall
                type="button"
                btnTxt={`${capitalizeFirstLetter(result.address.street)} ${result.address.number} - ${capitalizeFirstLetter(result.address.locality)}`}
                showSpinner={false}
                isDisabled={false}
                onClickFn={() => handleSelection(result)}
                extraClass={styleBtn.btn_link}
              />
            </li>
          ))}
        </ul>
      ) : (
        <>{(form.values.postalCode && isSearchProcess && searchResults.length===0) && <span>No se encontraron resultados</span>}</>
      )}
    </div>
  );
};

export default StoreFinder;
