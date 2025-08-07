import type { FC } from 'react';
import React from 'react'

interface Props{
  currentPage: number,
  pageSize: number,
  totalAmount: number,
}

const PageInfo: FC<Props> = ({ currentPage, pageSize, totalAmount }) => {

const startRange = (currentPage - 1) * pageSize + 1;
const endRange = Math.min(currentPage * pageSize, totalAmount);

  return (
    <p>{startRange}-{endRange} de {totalAmount}</p>
  )
}

export default PageInfo