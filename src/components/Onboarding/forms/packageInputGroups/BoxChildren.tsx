import React, {FC} from 'react';
import { FixedPackagesInfo } from '@/@types/constants';
import Image from 'next/image';

import styles from '../packageForm.module.sass';

interface Props {
  option: FixedPackagesInfo;
  predefinedSize: string;
  fixedOptionSelected: string;
}

const BoxChildren: FC<Props> = ({ option, predefinedSize, fixedOptionSelected }) => {
  return (
    <div className={`${styles.btn_illustrated_box} h-100`}>
      <p>{option.size}</p>
      {predefinedSize === 'personalized' || predefinedSize === '' ? (
        <Image
          src={'/assets/images/box-disabled.svg'}
          alt={`box size ${option.size}`}
          width={option.imgWidth}
          height={option.imgHeight}
        />
      ) : (
        <Image
          src={fixedOptionSelected === option.id ? '/assets/images/box-selected.svg' : '/assets/images/box.svg'}
          alt={`box size ${option.size}`}
          width={fixedOptionSelected === option.id ? option.altImgWidth : option.imgWidth}
          height={option.imgHeight}
        />
      )}
    </div>
  );
};

export default BoxChildren;
