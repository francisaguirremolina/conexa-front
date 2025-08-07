import React, {FC} from 'react';

import InputsSimple from '@/components/units/Inputs';

interface Props {
  form: any;
  ecommerce?: string;
  handleChange: (e: any) => void;
}

const PersonalDataInputs: FC<Props> = ({ form, handleChange, ecommerce}) => {  
  
  return (
    <>
      <InputsSimple
        {...form.getInputProps('firstName')}
        id="firstName"
        type="text"
        labelTxt="Nombre *"
        onChangeFn={handleChange}
        resultValidation={form.errors?.firstName ? 'is_invalid' : ''}
        errorTxt={form.errors?.firstName}
        customValue={form.values.firstName}
      />
      <InputsSimple
        {...form.getInputProps('lastName')}
        id="lastName"
        type="text"
        labelTxt="Apellido *"
        onChangeFn={handleChange}
        resultValidation={form.errors?.lastName ? 'is_invalid' : ''}
        errorTxt={form.errors?.lastName}
        customValue={form.values.lastName}
      />
      <InputsSimple
        {...form.getInputProps('companyName')}
        id="companyName"
        type="text"
        labelTxt="Nombre de la empresa *"
        onChangeFn={handleChange}
        resultValidation={form.errors?.companyName ? 'is_invalid' : ''}
        errorTxt={form.errors?.companyName}
        customValue={form.values.companyName}
      />
      {ecommerce !== 'tiendanube' &&
        <InputsSimple
          {...form.getInputProps('cuit')}
          id="cuit"
          type="text"
          labelTxt="CUIT *"
          onChangeFn={handleChange}
          resultValidation={form.errors?.cuit ? 'is_invalid' : ''}
          errorTxt={form.errors?.cuit}
          customValue={form.values.cuit}
          placeholder="Ej: 30-71702439-3"
        />
      }
    </>
  );
};

export default PersonalDataInputs;
