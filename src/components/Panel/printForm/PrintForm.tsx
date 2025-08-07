import { InputsSelect } from '@/components/units/Select';
import { useForm } from '@mantine/form';
import PanelService from '@/services/api/panel';
import React, { useEffect, useState } from 'react';
import ButtonSmall from '@/components/units/Button';

const PrintForm = () => {
  const [options, setOptions] = useState([]);
  const form = useForm({
    initialValues: {
      printFormat: '',
    },
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    form.setFieldValue('printFormat', e.target.value);
  };

  useEffect(() => {
    const fetchPrintSettings = async () => {
      try {
        const result = await PanelService.getPrintSettings();
        setOptions(result.data.printSettings);
        const initialValue = result.data.printMethod.toLowerCase();
        form.setFieldValue('printFormat', initialValue);
      } catch (error) {
        console.error('Error al obtener las opciones:', error);
      }
    };
    fetchPrintSettings();
  }, []);

  const savePrintSettings = async (values) => {
    try {
      const payload = {
        printMethod: values.printFormat.toUpperCase(),
      };
      await PanelService.printSettings(payload);
    } catch (error) {
      console.error('Error al guardar la configuración:', error);
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => savePrintSettings(values))}>
      <div className="w-75">
        <InputsSelect
          arrayList={options}
          value={form.values.printFormat}
          id="printFormat"
          labelTxt={'Formato de impresión'}
          placeholder="Seleccionar..."
          onChangeFn={handleSelectChange}
          previouslySelected={form.values.printFormat}
        />
      </div>
      <ButtonSmall type="submit" btnTxt="Guardar" extraClass="mt-4" />
    </form>
  );
};

export default PrintForm;
