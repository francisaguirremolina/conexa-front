import React from 'react';
// import { useRouter } from 'next/router';
// import ButtonSmall from '@/components/units/Button';
import Switch from '@/components/units/Switch';
import { FiRotateCcw } from 'react-icons/fi';

import stylesBtn from '../../../units/button.module.sass';

const LocationsTopActions = ({ activationSwitch, handleActiveAll, ecommerceSelected, isInsidePanel, isLoadingStores, getLocationsList }) => {
  // const router = useRouter();
  
  return (
    <div className="ps-2 mb-3 d-flex justify-content-between align-items-center">
      <Switch
        id="all"
        value={activationSwitch}
        checked={activationSwitch}
        onChangeFn={handleActiveAll}
        labelTxt={activationSwitch ? 'Desactivar todas las tiendas' : 'Activar todas las tiendas'}
      />
      <div className="d-flex justify-content-end align-items-center">
        {/* {ecommerceSelected === 'vtex' && (
          <ButtonSmall
            type="button"
            btnTxt="Crear muelle"
            icon={<FiPlusCircle />}
            showSpinner={false}
            isDisabled={false}
            onClickFn={() => router.push(`/${ecommerceSelected}/${isInsidePanel ? 'panel' : 'onboarding'}/create`)}
            extraClass={`${stylesBtn.outlined} ${stylesBtn.small_padding}`}
          />
        )} */}
        {(isInsidePanel || ecommerceSelected === 'vtex') && (
          <button
            className={`${stylesBtn.btn_primary} ${stylesBtn.outlined} p-2 ms-4`}
            onClick={() => getLocationsList()}
          >
            {isLoadingStores ? (
              <div className="spinner-grow spinner-grow-sm" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            ) : (
              <FiRotateCcw />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationsTopActions;
