import React, { FC } from 'react';

import InputsSimple from '@/components/units/Inputs';

import styles from '../signUpForm.module.sass';

interface Props {
  form: any;
  handleChange: (e: any) => void;
}

const PersonalInfo: FC<Props> = ({ form, handleChange }) => {

  return (
    <div className={`${styles.form_three_columns} mt-2`}>
      <InputsSimple
        {...form.getInputProps('firstName')}
        id="firstName"
        type="text"
        placeholder=""
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
        placeholder=""
        labelTxt="Apellido *"
        onChangeFn={handleChange}
        resultValidation={form.errors?.lastName ? 'is_invalid' : ''}
        errorTxt={form.errors?.lastName}
        customValue={form.values.lastName}
      />
      <InputsSimple
        {...form.getInputProps('email')}
        id="email"
        type="text"
        placeholder=""
        labelTxt="Email *"
        onChangeFn={handleChange}
        resultValidation={form.errors?.email ? 'is_invalid' : ''}
        errorTxt={form.errors?.email}
        customValue={form.values.email}
      />

      <div className={`${styles.form_two_columns} mt-2`}>
        <div className={`${styles.parent_special_label}`}>
          <span className={styles.special_phone_label}>Teléfono de contacto *</span>
          <InputsSimple
            {...form.getInputProps('prefix')}
            id="prefix"
            type="text"
            placeholder=""
            labelTxt="Prefijo"
            onChangeFn={handleChange}
            isDisabled={true}
            resultValidation={form.errors?.prefix ? 'is_invalid' : ''}
            errorTxt={form.errors?.prefix}
            customValue={form.values.prefix}
          />
        </div>
        <InputsSimple
          {...form.getInputProps('areaCode')}
          id="areaCode"
          type="text"
          placeholder="Ej: 11"
          labelTxt="Cód. area"
          onChangeFn={handleChange}
          resultValidation={form.errors?.areaCode ? 'is_invalid' : ''}
          errorTxt={form.errors?.areaCode}
          customValue={form.values.areaCode}
        />
      </div>
      <div className={`mt-2`}>
        <InputsSimple
          {...form.getInputProps('phoneNumber')}
          id="phoneNumber"
          type="text"
          placeholder="Ej: 11112222"
          labelTxt="Número"
          onChangeFn={handleChange}
          resultValidation={form.errors?.phoneNumber ? 'is_invalid' : ''}
          errorTxt={form.errors?.phoneNumber}
          customValue={form.values.phoneNumber}
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
