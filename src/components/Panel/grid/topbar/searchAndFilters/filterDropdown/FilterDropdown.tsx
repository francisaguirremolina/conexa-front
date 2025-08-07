import React, {FC} from 'react'
import { FilterState } from '@/@types/panel';
import Calendar from 'react-calendar';
import { dateFormatter } from '@/services/onboarding.service';
import { panelDispatchTypeOptions, panelStatusOptions } from '@/constants';

import ButtonSmall from '@/components/units/Button';
import { InputsSelect } from '@/components/units/Select';
import { FiX } from 'react-icons/fi';

import 'react-calendar/dist/Calendar.css';
import styles from '../searchAndFilters.module.sass';
import styleBtn from '../../../../../units/button.module.sass';
import styleInput from '../../../../../units/inputs.module.sass';
import { LooseValue } from 'react-calendar/dist/cjs/shared/types';

interface Props{
  filters: FilterState;
  setIsFiltersDropdownShown: (e: any) => void;
  setIsDateRangeDropdownShown: (e: any) => void;
  setDateValue: (e: any) => void;
  handleChange: (e: any) => void;
  handleTimeChange: (e: any) => void;
  cleanUpFilters: () => void;
  getFilteredOrders: () => void;
  isDateRangeDropdownShown: boolean;
  dateValue: string[] | null;
}

const FilterDropdown: FC<Props> = ({ setIsFiltersDropdownShown, filters, handleChange, setIsDateRangeDropdownShown, isDateRangeDropdownShown, dateValue, handleTimeChange, cleanUpFilters, setDateValue, getFilteredOrders }) => {

  return (
    <div id={styles.filter_dropdown_container}>
    <div className={`${styles.dropdown_top} mb-4`}>
      <span className={styles.main_subtitle}>Filtrar</span>
      <button
        className={styles.filter_dropdown_close}
        onClick={() => {
          setIsFiltersDropdownShown(false);
        }}
      >
        <FiX />
      </button>
    </div>

    <div className={`mb-3 mb-xl-4 w-100 ${styles.date_parent}`}>
      <div className={`${styleInput.select_wrapper}`}>
        <div
          className={`form-select ${styleInput.form_select}`}
          onClick={() => setIsDateRangeDropdownShown(!isDateRangeDropdownShown)}
        >
          {dateValue?.length === 2
            ? `${dateFormatter(String(dateValue[0]), false)} - ${dateFormatter(String(dateValue[1]), false)}`
            : 'Fecha'}
        </div>
      </div>
      {isDateRangeDropdownShown && (
        <Calendar
          onChange={handleTimeChange}
          value={dateValue as LooseValue}
          selectRange
          goToRangeStartOnSelect
          className={styles.date_child}
        />
      )}
    </div>
    
    <div className="mb-3 mb-xl-4 w-100">
      <InputsSelect
        value={filters.status}
        id="status"
        labelTxt=""
        onChangeFn={handleChange}
        arrayList={panelStatusOptions}
        previouslySelected={filters.status === 'all' ? '' : filters.status}
        placeholder="Estado"
      />
    </div>

    <div className="mb-3 mb-xl-4 w-100">
      <InputsSelect
        value={filters.dispatchType}
        id="dispatchType"
        labelTxt=""
        onChangeFn={handleChange}
        arrayList={panelDispatchTypeOptions}
        previouslySelected={filters.dispatchType === 'all' ? '' : filters.dispatchType}
        placeholder="Tipo de envío"
      />
    </div>

    <div className={styles.filter_btn_wrapper}>
      <ButtonSmall
        type="button"
        btnTxt="X Eliminar filtros"
        showSpinner={false}
        isDisabled={false}
        onClickFn={() => {
          cleanUpFilters();
          setDateValue(null);
        }}
        extraClass={styleBtn.btn_link}
      />

      <ButtonSmall
        type="button"
        btnTxt="Aplicar"
        onClickFn={() => getFilteredOrders()}
        showSpinner={false}
        isDisabled={false}
      />
    </div>
  </div>
  )
}

export default FilterDropdown