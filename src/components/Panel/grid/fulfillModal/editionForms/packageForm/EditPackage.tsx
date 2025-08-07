import React, { useState, useEffect, FC } from 'react';
import { Data } from '@/@types/panel';
import { useForm } from '@mantine/form';
import { validation } from '@/services/validations.service';
import ToggleButton from '../toggleButton/ToggleButton';
import PackageInputs from './PackageInputs';

import styles from '../../fulfillModal.module.sass';
import styleInput from '../../../../../units/inputs.module.sass';

interface Props {
  formInfo: Data;
  saveChanges: (e: any) => void;
  isLoading: boolean;
  isReadOnly: boolean;
  isPassingValuesSum: boolean;
  setIsPassingValuesSum: (e: any) => void;
}

const EditPackage: FC<Props> = ({
  formInfo,
  saveChanges,
  isLoading,
  isReadOnly,
  isPassingValuesSum,
  setIsPassingValuesSum,
}) => {
  const [isEditionAvailable, setIsEditionAvailable] = useState(false);

  const form = useForm({
    initialValues: {
      width: formInfo?.packageData?.width || formInfo?.packageSettings?.width || 1,
      height: formInfo?.packageData?.height || formInfo?.packageSettings?.height || 1,
      length: formInfo?.packageData?.length || formInfo?.packageSettings?.length || 1,
      bulks: formInfo?.packageData?.bulks || formInfo?.packageSettings?.bulks || 1,
    },
    validate: {
      width: (value: string | any) => validation(value, 'maxSize', 0, 0, 398),
      height: (value: string | any) => validation(value, 'maxSize', 0, 0, 398),
      length: (value: string | any) => validation(value, 'maxSize', 0, 0, 398),
      bulks: (value: string | any) => validation(value, 'maxBulkValue'),
    },
  });

  const handleChange = (e) => {
    form.setFieldValue(`${e.target.id}`, e.target.value);
  };

  useEffect(() => {
    const sum = Number(form.values.width) + Number(form.values.height) + Number(form.values.length);
    setIsPassingValuesSum(sum <= 400);
  }, [form]);

  return (
    <form className={styles.fulfill_body_module}>
      <ToggleButton
        isEditionAvailable={isEditionAvailable}
        setIsEditionAvailable={setIsEditionAvailable}
        blockTitle="Paquete"
        submit={form.onSubmit((values) => {
          saveChanges({
            packageData: {
              width: Number(values.width),
              height: Number(values.height),
              length: Number(values.length),
              bulks: Number(values.bulks),
            },
          });
        })}
        hideEditBtn={isReadOnly}
        disableButton={!isPassingValuesSum}
      />
      <div>
        {isLoading ? (
          ''
        ) : (
          <>
            <PackageInputs form={form} isEditionAvailable={isEditionAvailable} handleChange={handleChange} />
            {!isPassingValuesSum && (
              <span className={`${styleInput.invalid_msg}`}>El valor de las 3 medidas no puede superar los 400 cm</span>
            )}
          </>
        )}
      </div>
    </form>
  );
};

export default EditPackage;
