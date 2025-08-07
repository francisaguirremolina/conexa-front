const validateEmail = (value: any) => {
  return (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) ? null : 'El formato esperado es user@example.com');
}

const validateUrl = (value: any) => {
  // eslint-disable-next-line no-useless-escape
  return (/^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/igm.test(value) ? null : 'Formato incorrecto');
}

const validateCuit = (value: string | number) => {
  return (/^\d{2}-\d{8}-\d$/g.test(String(value)) ? null : 'El formato esperado es xx-xxxxxxxx-x');
}

const validateAccount = (value: string | number) => {
  return (/^\d{6}[/]\d{3}$/g.test(String(value)) ? null : 'Número de cuenta incorrecto');
}

const validateLength = (value: string | number, maxChars: number = 30) => {
  return ((String(value) !== "" && Number(value) > 0 && String(value).length <= maxChars) ? null : `Máximo ${maxChars} caracteres`)
}

const validateMinimum = (value: string | number, minChars: number = 1) => {
  return ((String(value).length >= minChars) ? null : `${minChars === 1 ? "Este campo es obligatorio" : `Debe tener al menos ${minChars} caracteres`}`)
}

const validateTopSize = (value: string | number, topVal: number = 100) => {
  return ((String(value) !== "" && Number(value) > 0 && Number(value) <= topVal) ? null : `Completa este campo. La medida máxima es de ${topVal} cm`)
}

const validateTopValue = (value: string | number, topAmount: number = 10) => {
  return ((String(value) !== "" && Number(value) > 0 && Number(value) <= topAmount) ? null : `Completa este campo. El valor máximo es ${topAmount}`)
}

const validatePhoneFormat = (value: string | number) => {
  return ((String(value) !== "" && Number(value) > 0  && String(value).length >= 6 && String(value).length <= 8) ? null : `Debe contener entre 6 y 8 caracteres`)
}


export const validation = (inputValue: string | number, condition: string, minChar?: number, maxChar?: number, topValue?: number, topAmount?: number) => {
  let result: any = "";
  switch (condition) {
    case "minLength":
      result = validateMinimum(inputValue, minChar);
      break;
    case "maxLength":
      result = validateLength(inputValue, maxChar);
      break;
    case "emailFormat":
      result = validateEmail(inputValue);
      break;
    case "urlFormat":
      result = validateUrl(inputValue);
      break;
    case "cuitFormat":
      result = validateCuit(inputValue);
      break;
    case "accountFormat":
      result = validateAccount(inputValue);
      break;
    case "maxSize":
      result = validateTopSize(inputValue, topValue);
      break;
    case "maxBulkValue":
      result = validateTopValue(inputValue, topAmount);
      break;
    case "phoneNumberFinalFormat":
      result = validatePhoneFormat(inputValue);
      break;
    default:
      break;
  }
  return result
}

export const validateFullInfoComplete = (dataArr: any[], flagSetter: (e: boolean) => void) => {
  const isMissingData = dataArr.some(arrItem => !arrItem || arrItem.toString().includes("null"));
  if (isMissingData) {
    flagSetter(false)
  } else {
    flagSetter(true)
  }
}

export const validateSum = (form: any, setter: (e: any) => void) => {
  const sum = Number(form.values.width) + Number(form.values.height) + Number(form.values.length)
  if (sum <= 400) {
    setter(true)
  } else {
    setter(false)
  }
}