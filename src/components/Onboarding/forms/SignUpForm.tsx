import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import Image from 'next/image';

import TooltipComp from '@/components/units/Tooltip';
import { extractInfoFromCookies, manageLoadingState, manuallyShowError, manuallyShowSuccess } from '@/services/utils.service';
import { validation } from '@/services/validations.service';

import Navigation from '../navigation/Navigation';
import AttachFile from './signupInputGroup/AttachFile';
import CompanyInfo from './signupInputGroup/CompanyInfo';
import PersonalInfo from './signupInputGroup/PersonalInfo';
import { useCrossDataStore } from '@/store';

import styles from './signUpForm.module.sass';

const SignUpForm = () => {
  const router = useRouter();
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);
  const baseUrl = useCrossDataStore((state) => state.ecommerce.apiUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [registration, setRegistration] = useState<File>();
  const [IiBbFile, setIiBbFile] = useState<File>();
  const form = useForm({
    initialValues: {
      businessName: '',
      cuit: '',
      area: '',
      commercialAddress: '',
      floor: '',
      department: '',
      locality: '',
      province: '',
      postalCode: '',
      firstName: '',
      lastName: '',
      prefix: '54',
      areaCode: '',
      phoneNumber: '',
      email: '',
    },
    validate: {
      businessName: (value: string) => validation(value, 'minLength'),
      cuit: (value: string) => validation(value, 'cuitFormat'),
      area: (value: string) => validation(value, 'minLength'),
      commercialAddress: (value: string) => validation(value, 'minLength'),
      locality: (value: string) => validation(value, 'minLength'),
      province: (value: string) => validation(value, 'minLength'),
      postalCode: (value: string | any) => validation(value, "maxLength", 1, 4),
      firstName: (value: string) => validation(value, 'minLength'),
      lastName: (value: string) => validation(value, 'minLength'),
      prefix: (value: string | number) => validation(value, 'maxLength', 1, 2),
      areaCode: (value: string | number) => validation(value, 'maxLength', 1, 4),
      phoneNumber: (value: string | number) => validation(value, 'phoneNumberFinalFormat'),
      email: (value: string) => validation(value, 'emailFormat'),
    },
  });

  const handleChange = (e) => {
    form.setFieldValue(`${e.target.id}`, e.target.value);
  };

  const handleUploadChange = (e) => {
    const fileType = String(e.target?.files[0]?.type);
    const fileSize = Number(e.target?.files[0]?.size);
    if (fileType.includes('pdf') && fileSize <= 10485760) { //10mb
      switch (e.target.id) {
        case 'registration_file':
          setRegistration(e.target.files[0]);
          break;
        case 'iibb_file':
          setIiBbFile(e.target.files[0]);
          break;
        default:
          break;
      }
    } else {
      manuallyShowError('El formato debe ser pdf y pesar menos de 10mb.');
    }
  };

  const sendSignUpInfo = async (values: typeof form.values) => {
    form.validate();
    setIsLoading(true);
    manageLoadingState(setIsLoading, 2000);
    const bodyStructure = {
      store: {
        businessName: values.businessName,
        cuit: values.cuit,
        area: values.area,
        commercialAddress: values.commercialAddress,
        floor: values.floor,
        department: values.department,
        locality: values.locality,
        province: values.province,
        postalCode: values.postalCode,
      },
      personalData: {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: `${values.prefix}${values.areaCode}${values.phoneNumber}`,
        email: values.email,
      },
    };

    const userIdValue = extractInfoFromCookies('userId');

    const formData = new FormData();
    // @ts-ignore
    formData.append('inscriptionAFIP', registration);
    // @ts-ignore
    formData.append('inscriptionIB', IiBbFile);
    formData.append('store', JSON.stringify(bodyStructure?.store));
    formData.append('personalData', JSON.stringify(bodyStructure?.personalData));

    const res = await fetch(`${baseUrl}/api/v1/onboarding/register?userId=${userIdValue}`, { method: 'POST', body: formData, });
    const data = await res.json();
    if (data?.success) {
      manuallyShowSuccess('Tus datos fueron enviados.');
      router.push(`/${ecommerceSelected}/onboarding/sign-up/finish`);
    } else {
      manuallyShowError('No pudimos enviar tus datos. Reintentalo.');
    }
  };


  const ecommerceRoutes = {
    tiendanube: 'welcome',
    woocommerce: 'welcome',
    prestashop: 'welcome',
    vtex: '/onboarding/sign-in',
  }
  const route = ecommerceRoutes[ecommerceSelected] || '/';


  return (
    <form className={`${styles.form_wrapper}`} onSubmit={form.onSubmit((values) => sendSignUpInfo(values))}>
      <div className={`${styles.list_wrapper}`}>
        <ul className="d-flex flex-column justify-content-left align-items-left">
          <li>
            <AttachFile inputId="registration_file" handleUploadChange={handleUploadChange} fileValue={registration}>
              1. Tu constancia de inscripción en AFIP.
              <TooltipComp hideTime={3000}>
                <span>Conseguila siguiendo los pasos detallados en AFIP. </span>
                <a
                  className={`${styles.btn_external_link}`}
                  href="https://seti.afip.gob.ar/padron-puc-constancia-internet/ConsultaConstanciaAction.do"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click aquí para obtener el formulario.
                </a>
              </TooltipComp>
            </AttachFile>
          </li>
          <li>
            <AttachFile inputId="iibb_file" handleUploadChange={handleUploadChange} fileValue={IiBbFile}>
              2. Tu constancia de inscripción en Ingresos Brutos.
              <TooltipComp>
                <div className={`${styles.iibb_example}`}>
                  <span>
                    Conseguila buscando &quot;Constancia de Ingresos Brutos + el nombre de tu provincia&quot; en Google,
                    ya que varía según la provincia.
                  </span>
                  <Image src={'/assets/images/IIBB-example.jpg'} alt="IIBB example" width={300} height={276} />
                </div>
              </TooltipComp>
            </AttachFile>
          </li>
          <li className={`${styles.last_item}`}>
            <span>3. Datos personales</span>
            <PersonalInfo form={form} handleChange={handleChange} />
          </li>
        </ul>
        <ul className="d-flex flex-column justify-content-left align-items-left">
          <li className={`${styles.last_item}`}>
            <span>4. Datos de tu negocio</span>
            <CompanyInfo form={form} handleChange={handleChange} />
          </li>
        </ul>
      </div>
      <div className="w-75 m-auto px-5">
        <Navigation
          linkHref={`/${ecommerceSelected}/${route}`}
          linkTxt="Cancelar"
          btnType="submit"
          btnTxt="Pedir alta en OCA"
          btnSpinner={isLoading}
          btnDisabled={!registration || !IiBbFile}
        />
      </div>
    </form>
  );
};

export default SignUpForm;
