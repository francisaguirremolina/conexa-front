import React, { useState, FC } from 'react';
import { Data } from '@/@types/panel';
import { useForm } from '@mantine/form';
import { validation } from '@/services/validations.service';
import ToggleButton from '../toggleButton/ToggleButton';

import styles from '../../fulfillModal.module.sass';
import RemitterInputs from './RemitterInputs';

interface Props {
  formInfo: Data;
  saveChanges: (e: any) => void;
  isLoading: boolean;
  isReadOnly: boolean;
}

const EditRemitter: FC<Props> = ({ formInfo, saveChanges, isLoading, isReadOnly }) => {
  const [isEditionAvailable, setIsEditionAvailable] = useState(false);

  const form = useForm({
    initialValues: {
      firstName: formInfo.recipient?.firstName || '',
      lastName: formInfo.recipient?.lastName || '',
      cuil: formInfo.recipient?.cuil || '',
    },
    validate: {
      firstName: (value: string) => validation(value, 'minLength'),
      lastName: (value: string) => validation(value, 'minLength'),
      cuil: (value: string) => validation(value, 'minLength'),
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
        blockTitle="Destinatario"
        submit={form.onSubmit((values) => saveChanges({ recipient: values }))}
        hideEditBtn={isReadOnly}
      />
      <div>
        {isLoading ? (
          ''
        ) : (
          <RemitterInputs form={form} isEditionAvailable={isEditionAvailable} handleChange={handleChange} />
        )}
      </div>
    </form>
  );
};

export default EditRemitter;
