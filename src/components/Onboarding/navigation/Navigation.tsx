import { motion } from 'framer-motion';
import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';

import { ButtonSmall } from '@/components/units/Button';
import { getFadeInProps } from '@/services/animations.service';

import styleBtn from '../../units/button.module.sass';

interface Props {
  linkHref?: string | any;
  linkTxt?: string;
  btnType: string;
  btnTxt?: string;
  btnFn?: (e: any) => void;
  btnSpinner?: boolean;
  btnDisabled?: boolean;
}

const Navigation: FC<Props> = ({
  linkHref,
  linkTxt = 'Volver',
  btnType = 'submit',
  btnTxt = 'Continuar',
  btnFn,
  btnSpinner = false,
  btnDisabled = false,
}) => {
  return (
    <motion.div
      {...getFadeInProps({ delay: 1.7 })}
      className={`d-flex justify-content-between align-items-center ${!linkHref ? 'flex-row-reverse' : ''}`}
    >
      {linkHref ? (
        <Link href={linkHref} passHref>
          <a className={`${styleBtn.btn_link}`}>{linkTxt}</a>
        </Link>
      ) : null}
      <ButtonSmall type={btnType} btnTxt={btnTxt} onClickFn={btnFn} showSpinner={btnSpinner} isDisabled={btnDisabled} />
    </motion.div>
  );
};

export default Navigation;
