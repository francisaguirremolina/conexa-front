import React, { FC } from 'react';

import InputsSimple from '@/components/units/Inputs';

import styles from '../signUpForm.module.sass';

interface Props {
  form: any;
  handleChange: (e: any) => void;
}

const CompanyInfo: FC<Props> = ({ form, handleChange }) => {
  return (
    <div className={`${styles.form_three_columns} mt-2`}>
      <InputsSimple
        {...form.getInputProps('businessName')}
        id="businessName"
        type="text"
        placeholder=""
        labelTxt="Razón social *"
        onChangeFn={handleChange}
        resultValidation={form.errors?.businessName ? 'is_invalid' : ''}
        errorTxt={form.errors?.businessName}
        customValue={form.values.businessName}
      />
      <InputsSimple
        {...form.getInputProps('cuit')}
        id="cuit"
        type="text"
        placeholder="Ej: 30-71702439-3"
        labelTxt="CUIT *"
        onChangeFn={handleChange}
        resultValidation={form.errors?.cuit ? 'is_invalid' : ''}
        errorTxt={form.errors?.cuit}
        customValue={form.values.cuit}
      />
      <InputsSimple
        {...form.getInputProps('area')}
        id="area"
        type="text"
        placeholder=""
        labelTxt="Rubro *"
        onChangeFn={handleChange}
        resultValidation={form.errors?.area ? 'is_invalid' : ''}
        errorTxt={form.errors?.area}
        customValue={form.values.area}
      />
      <InputsSimple
        {...form.getInputProps('commercialAddress')}
        id="commercialAddress"
        type="text"
        placeholder=""
        labelTxt="Domicilio comercial *"
        onChangeFn={handleChange}
        resultValidation={form.errors?.commercialAddress ? 'is_invalid' : ''}
        errorTxt={form.errors?.commercialAddress}
        customValue={form.values.commercialAddress}
      />
      <div className={`${styles.form_two_columns}`}>
        <InputsSimple
          {...form.getInputProps('floor')}
          id="floor"
          type="text"
          placeholder=""
          labelTxt="Piso/Departamento"
          onChangeFn={handleChange}
          resultValidation={form.errors?.floor ? 'is_invalid' : ''}
          errorTxt={form.errors?.floor}
          customValue={form.values.floor}
        />
        <InputsSimple
          {...form.getInputProps('department')}
          id="department"
          type="text"
          placeholder=""
          labelTxt="Depto."
          onChangeFn={handleChange}
          resultValidation={form.errors?.department ? 'is_invalid' : ''}
          errorTxt={form.errors?.department}
          customValue={form.values.department}
        />
      </div>
      <InputsSimple
        {...form.getInputProps('locality')}
        id="locality"
        type="text"
        placeholder=""
        labelTxt="Localidad *"
        onChangeFn={handleChange}
        resultValidation={form.errors?.locality ? 'is_invalid' : ''}
        errorTxt={form.errors?.locality}
        customValue={form.values.locality}
      />
      <InputsSimple
        {...form.getInputProps('province')}
        id="province"
        type="text"
        placeholder=""
        labelTxt="Provincia *"
        onChangeFn={handleChange}
        resultValidation={form.errors?.province ? 'is_invalid' : ''}
        errorTxt={form.errors?.province}
        customValue={form.values.province}
      />
      <InputsSimple
        {...form.getInputProps('postalCode')}
        id="postalCode"
        type="text"
        placeholder="Ej: 1414"
        labelTxt="Código postal *"
        onChangeFn={handleChange}
        resultValidation={form.errors?.postalCode ? 'is_invalid' : ''}
        errorTxt={form.errors?.postalCode}
        customValue={form.values.postalCode}
      />
    </div>
  );
};

export default CompanyInfo;
