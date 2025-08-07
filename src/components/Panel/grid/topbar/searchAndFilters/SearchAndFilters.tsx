/* eslint-disable no-console */
import React, { useState, useEffect, FC } from 'react';
import { FetchOrders, FilterState } from '@/@types/panel';
import Image from 'next/image';
import { FiSearch, FiX } from 'react-icons/fi';

import styles from './searchAndFilters.module.sass';
import FilterDropdown from './filterDropdown/FilterDropdown';

interface Props{
  filters: FilterState;
  filterSetter: (e: any) => void;
  cleanUpFilters: () => void;
  getFilteredOrders: FetchOrders;
}

const SearchAndFilters: FC<Props> = ({ filters, filterSetter, getFilteredOrders, cleanUpFilters }) => {
  const [isFiltersDropdownShown, setIsFiltersDropdownShown] = useState(false);
  const [isDateRangeDropdownShown, setIsDateRangeDropdownShown] = useState(false);
  const [filtersCounter, setFiltersCounter] = useState<string[]>([]);
  const [dateValue, setDateValue] = useState<string[] | null>(null);

  const handleChange = (e) => {
    filterSetter({ ...filters, [e.target.id]: e.target.value });
  };

  const handleTimeChange = (datesSelected: string[]) => {
    if (datesSelected.length === 2) {
      const from = new Date(String(datesSelected[0])).toISOString();
      const to = new Date(String(datesSelected[1])).toISOString();
      filterSetter({ ...filters, dateFrom: from, dateTo: to });
      setDateValue([...datesSelected]);
      setIsDateRangeDropdownShown(false);
    }
  };

  const verifyFiltersSelected = () => {
    let filterArr: string[] = [];
    for (const filterKey in filters) {
      if (filterKey === 'status' || filterKey === 'dispatchType') {
        if (filters[filterKey] !== 'all') {
          filterArr.push(filterKey);
        }
      }
      if (filterKey === 'dateFrom' && filters[filterKey] !== '1970-01-01T00:00:00Z') {
        filterArr.push(filterKey);
      }
    }
    setFiltersCounter([...filterArr]);
  };

  useEffect(() => {
    verifyFiltersSelected();
  }, [filters]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getFilteredOrders();
  }

  const handleClearSearch = (e) => {
    e.preventDefault();
    filterSetter( (prevState) => ({ ...prevState, searchTag: '' }));
    getFilteredOrders(undefined, undefined, undefined, undefined, undefined, undefined, undefined, '');
  };

  const filtersProps = { setIsFiltersDropdownShown, filters, handleChange, setIsDateRangeDropdownShown, isDateRangeDropdownShown, dateValue, handleTimeChange, cleanUpFilters, setDateValue, getFilteredOrders }
  return (
    <div className={styles.search_and_filter_container}>
      <form className={styles.search_wrapper} onSubmit={handleSubmit}>
        <FiSearch size={16} />
        <input
          onChange={(e) => filterSetter({ ...filters, searchTag: e.target.value })}
          value={filters.searchTag}
          type="text"
          name="q"
          id={styles.search_input}
          placeholder="Buscar por nombre o ID"
        />
        {filters.searchTag && (
          <button type="button" onClick={handleClearSearch}>
            <FiX />
          </button>
        )}
      </form>
      <div className={styles.filter_wrapper}>
        <Image src={'/assets/images/icons/filterSwitches.svg'} alt="filter" width={12} height={12} />
        <button
          className={styles.filter_dropdown_btn}
          type="button"
          onClick={() => {
            setIsFiltersDropdownShown(!isFiltersDropdownShown);
          }}
        >
          Filtrar
        </button>
        {filtersCounter.length > 0 && <span className={styles.filters_counter}>{filtersCounter.length}</span>}
      </div>
      {isFiltersDropdownShown && (
        <FilterDropdown {...filtersProps} />
      )}
    </div>
  );
};

export default SearchAndFilters;
