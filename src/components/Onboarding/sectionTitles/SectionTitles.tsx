import type { FC, PropsWithChildren } from 'react';
import React from 'react';

import styles from './sectionTitles.module.sass';

interface Props {
  titleTxt?: string;
  isMain?: boolean;
  subTxt?: string;
  isCentered?: boolean;
  children?: PropsWithChildren;
}

const SectionTitles: FC<PropsWithChildren<Props>> = ({ titleTxt, isMain = true, subTxt, isCentered=false, children }) => {
  
  return (
    <div className={`${isCentered ? styles.centered : "" }`}>
      {titleTxt && isMain ? (
        <h1 className={`${styles.section_title}`}>{titleTxt}</h1>
      ) : (
        <h2 className={`${styles.section_title}`}>{titleTxt}</h2>
      )}
      {subTxt && <p className={`${styles.section_subtitle}`}>{subTxt}</p>}
      {children && children}
    </div>
  );
};

export default SectionTitles;
