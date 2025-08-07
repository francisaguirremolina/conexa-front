import React, {FC} from 'react';
import PersonalizedSizes from './PersonalizedSizes';

import styles from '../packageForm.module.sass';
import styleInput from '../../../units/inputs.module.sass';

interface Props{
  form: any; 
  handleTextChange: (e: any) => void;
  predefinedSize: string; 
  isPassingValuesSum: boolean;
}

const PersonalizedGroup: FC<Props> = ({ form, handleTextChange, predefinedSize, isPassingValuesSum }) => {
  return (
    <>
      <div className={`${styles.labels_triple_wrapper} mt-2`}>
        <p>Alto</p>
        <p>Ancho</p>
        <p>Largo</p>
      </div>
      <PersonalizedSizes
        form={form}
        handleChange={handleTextChange}
        isPersonalizedSelected={predefinedSize === 'personalized'}
      />
      {!isPassingValuesSum && (
        <span className={`${styleInput.invalid_msg}`}>La suma total de las medidas debe ser de 400 cm.</span>
      )}
    </>
  );
};

export default PersonalizedGroup;
