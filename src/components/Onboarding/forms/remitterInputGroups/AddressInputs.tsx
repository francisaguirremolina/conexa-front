import React, { FC } from 'react';
import InputsSimple from '@/components/units/Inputs';
import { InputsSelect } from '@/components/units/Select';
import { mapDataForSelect } from '@/services/utils.service';
import provinceData from '../../../../constants/provinceData';
import styles from '../remitterForm.module.sass';
interface Props {
  form: any;
  handleChange: (e: any) => void;
}
const AddressInputs: FC<Props> = ({ form, handleChange }) => {
  return (
    <>
      <InputsSimple
        {...form.getInputProps('street')}
        id="street"
        type="text"
        labelTxt="Calle *"
        onChangeFn={handleChange}
        resultValidation={form.errors?.street ? 'is_invalid' : ''}
        errorTxt={form.errors?.street}
        customValue={form.values.street}
      />
      <div className={`${styles.inputs_triple}`}>
        <InputsSimple
          {...form.getInputProps('number')}
          id="number"
          type="text"
          labelTxt="Número *"
          onChangeFn={handleChange}
          resultValidation={form.errors?.number ? 'is_invalid' : ''}
          errorTxt={form.errors?.number}
          customValue={form.values.number}
        />
        <InputsSimple
          {...form.getInputProps('floor')}
          id="floor"
          type="text"
          labelTxt="Piso/Departamento"
          onChangeFn={handleChange}
          resultValidation={form.errors?.floor ? 'is_invalid' : ''}
          errorTxt={form.errors?.floor}
          customValue={form.values.floor}
        />
      </div>
      <div className={`${styles.inputs_double}`}>
        <InputsSimple
          {...form.getInputProps('postalCode')}
          id="postalCode"
          type="number"
          labelTxt="Código postal *"
          onChangeFn={handleChange}
          resultValidation={form.errors?.postalCode ? 'is_invalid' : ''}
          errorTxt={form.errors?.postalCode}
          customValue={String(form.values.postalCode).replace(/^0+/, '')}
          placeholder="Ej: 1414"
        />
        <InputsSelect
          isRemitter
          value={form.values.province}
          id="province"
          labelTxt="Provincia *"
          onChangeFn={handleChange}
          resultValidation={form.errors?.province ? 'is_invalid' : ''}
          arrayList={mapDataForSelect(provinceData, 'nombre', 'iso_nombre')}
          previouslySelected={form.values.province.toUpperCase()}
        />
      </div>
      <InputsSimple
        {...form.getInputProps('locality')}
        id="locality"
        type="text"
        labelTxt="Localidad *"
        onChangeFn={handleChange}
        resultValidation={form.errors?.locality ? 'is_invalid' : ''}
        errorTxt={form.errors?.locality}
        customValue={form.values.locality}
      />
    </>
  );
};
export default AddressInputs;
