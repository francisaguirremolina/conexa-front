import React, {FC} from 'react';

import InputsSimple from '@/components/units/Inputs';

import styles from '../packageForm.module.sass';

interface Props {
  form: any;
  handleChange: (e: any) => void;
  isPersonalizedSelected: boolean;
}

const PersonalizedSizes: FC<Props> = ({ form, handleChange, isPersonalizedSelected }) => {
  
  return (
    <div className={`${styles.inputs_triple_wrapper}`}>

<div className={`${styles.input_guide_parent}`}>
        <InputsSimple
          {...form.getInputProps('height')}
          id="height"
          type="number"
          placeholder="00,00"
          labelTxt=""
          min={1}
          onChangeFn={handleChange}
          resultValidation={form.errors?.height ? 'is_invalid' : ''}
          errorTxt={form.errors?.height}
          isDisabled={!isPersonalizedSelected}
          customValue={form.values.height}
        />
        <span className={`${styles.input_guide_child}`}>cm</span>
      </div>
      <span>X</span>
      <div className={`${styles.input_guide_parent}`}>
        <InputsSimple
          {...form.getInputProps('width')}
          id="width"
          type="number"
          placeholder="00,00"
          labelTxt=""
          min={1}
          onChangeFn={handleChange}
          resultValidation={form.errors?.width ? 'is_invalid' : ''}
          errorTxt={form.errors?.width}
          isDisabled={!isPersonalizedSelected}
          customValue={form.values.width}
        />
        <span className={`${styles.input_guide_child}`}>cm</span>
      </div>
      <span>X</span>

      

      <div className={`${styles.input_guide_parent}`}>
        <InputsSimple
          {...form.getInputProps('length')}
          id="length"
          type="number"
          placeholder="00,00"
          min={1}
          labelTxt=""
          onChangeFn={handleChange}
          resultValidation={form.errors?.length ? 'is_invalid' : ''}
          errorTxt={form.errors?.length}
          isDisabled={!isPersonalizedSelected}
          customValue={form.values.length}
        />
        <span className={`${styles.input_guide_child}`}>cm</span>
      </div>
    </div>
  );
};

export default PersonalizedSizes;
