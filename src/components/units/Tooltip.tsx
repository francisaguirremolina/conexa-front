import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { RiInformationFill } from 'react-icons/ri';

import styles from './tooltip.module.sass';

interface Props {
  hideTime?: number;
}

const TooltipComp: FC<PropsWithChildren<Props>> = ({ children, hideTime = 500 }) => {
  return (
    <OverlayTrigger
      key="top"
      placement="top"
      delay={{ show: 300, hide: hideTime }}
      overlay={
        <Tooltip id={`${styles.tooltip_top}`}>
          {children}
        </Tooltip>
      }
    >
      <button type="button" className={`${styles.hidden_btn}`}>
        <RiInformationFill size={16} className={`${styles.info_icon}`}/>
      </button>
    </OverlayTrigger>
  );
};

export default TooltipComp;
