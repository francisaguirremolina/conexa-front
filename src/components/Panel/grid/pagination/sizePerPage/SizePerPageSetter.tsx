import type { FC } from 'react';
import React from 'react';
import { PaginationTypes } from '@/@types/panel';
import { SizePerPageTypes } from '@/@types/constants';
import {  SizePerPageInputsSelect } from '@/components/units/Select';

import styles from '../paginationGroup.module.sass'

interface Props{
  sizeOptions: SizePerPageTypes[],
  currentSize: PaginationTypes["pageSize"],
  setSize: (e: any) => void,
  titleTxt?: string,
}

const SizePerPageSetter: FC<Props> = ({ sizeOptions, currentSize, setSize, titleTxt = 'Órdenes por página' }) => {
  const handleSizeChange = (e) => {
    setSize((prevState) => ({ ...prevState, currentPage: 1, pageSize: parseInt(e.target.value), paginationFrom: 0 }));
  };
  return (
    <div className='d-flex justify-content-between align-items-center'>
      <p>{titleTxt}</p>
      <div className={styles.sizePerPage_parent}>
        <SizePerPageInputsSelect
        id="sizePerPage"
        value={String(currentSize)}
        onChangeFn={handleSizeChange}
        arrayList={sizeOptions}
        previouslySelected={String(currentSize)}
        />
      </div>
    </div>
  );
};

export default SizePerPageSetter;
