import React, {FC} from 'react';

import Radio from '@/components/units/Radio';
import { daysList } from '@/constants';

import styles from '../dispatchForm.module.sass';
import CheckboxButton from '@/components/units/CheckboxButton';
import { ActiveDay } from '@/@types/onboarding';

interface Props {
  form: any;
  handleChange: (e: any) => void;
  handleTime: (eachDay: number) => void;
}

const DaysAndTimeInputsGroup: FC<Props> = ({ form, handleChange, handleTime }) => {
  return (
    <div>
      <h4>¿En qué día y horario recolectaremos tus paquetes?</h4>
      <div className="d-flex justify-content-start align-items-center flex-wrap mt-3">
        {form.values.activeDays.map( (eachDay: ActiveDay) => (
          <CheckboxButton
            key={`k-${eachDay.day}`}
            value={String(eachDay.day)}
            id={String(eachDay.day)}
            onChangeFn={() => handleTime(eachDay.day)}
            checked={eachDay.active===true}
            extraClassName="radioBtn_wrapper"
          >
            <div className="d-flex justify-content-center align-items-center h-100">
              <span>{daysList[eachDay.day]}</span>
            </div>
          </CheckboxButton>
        ))}
      </div>

      <div className="d-flex justify-content-start align-items-center mt-3 mt-xxl-4">
        <Radio value="2" id="morning" name="defaultTimeRange" onChangeFn={handleChange} checked={form.values.defaultTimeRange === "2"}>
          <div className={`${styles.radio_text} h-100`}>
            <p>Mañana</p>
            <p className={`${styles.light}`}>De 8:00 a 12:00 hs</p>
          </div>
        </Radio>
        <Radio value="3" id="afternoon" name="defaultTimeRange" onChangeFn={handleChange} checked={form.values.defaultTimeRange === "3"}>
          <div className={`${styles.radio_text} h-100`}>
            <p>Tarde</p>
            <p className={`${styles.light}`}>De 14:00 a 17:00 hs</p>
          </div>
        </Radio>
        <Radio value="1" id="full" name="defaultTimeRange" onChangeFn={handleChange} checked={form.values.defaultTimeRange === "1"}>
          <div className={`${styles.radio_text} h-100`}>
            <p>Franja completa</p>
            <p className={`${styles.light}`}>De 08:00 a 17:00 hs</p>
          </div>
        </Radio>
      </div>

    </div>
  );
};

export default DaysAndTimeInputsGroup;
