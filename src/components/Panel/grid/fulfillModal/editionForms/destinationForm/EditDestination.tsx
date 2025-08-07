import React, { useState, FC } from 'react';
import { Data } from '@/@types/panel';
import { useForm } from '@mantine/form';
import { validation } from '@/services/validations.service';
import ToggleButton from '../toggleButton/ToggleButton';
import DestinationInputs from './DestinationInputs';

import styles from '../../fulfillModal.module.sass';

interface Props {
  formInfo: Data;
  saveChanges: (e: any) => void;
  isLoading: boolean;
}

const EditDestination: FC<Props> = ({ formInfo, saveChanges, isLoading }) => {
  const [isEditionAvailable, setIsEditionAvailable] = useState(false);

  const form = useForm({
    initialValues: {
      province: formInfo?.shippingAddress.province || '',
      locality: formInfo?.shippingAddress.locality || '',
      number: formInfo?.shippingAddress.number || '',
      street: formInfo?.shippingAddress.street || '',
      floor: formInfo?.shippingAddress.floor || '-',
      apartment: formInfo?.shippingAddress.apartment || '-',
      postalCode: formInfo?.shippingAddress.postalCode || '',
    },
    validate: {
      province: (value: string) => validation(value, 'minLength'),
      locality: (value: string) => validation(value, 'minLength'),
      number: (value: string | any) => validation(value, 'minLength'),
      street: (value: string) => validation(value, 'minLength'),
      postalCode: (value: string | any) => validation(value, "maxLength", 1, 4),
    },
  });

  const handleChange = (e) => {
    form.setFieldValue(`${e.target.id}`, e.target.value);
  };

  return (
    <form className={styles.fulfill_body_module}>
      <ToggleButton
        isEditionAvailable={isEditionAvailable}
        setIsEditionAvailable={setIsEditionAvailable}
        blockTitle="Destino"
        submit={form.onSubmit((values) => saveChanges(values))}
        hideEditBtn={true}
      />
      <div>
        {isLoading ? (
          ''
        ) : (
          <DestinationInputs form={form} isEditionAvailable={isEditionAvailable} handleChange={handleChange} />
        )}
      </div>
    </form>
  );
};

export default EditDestination;
