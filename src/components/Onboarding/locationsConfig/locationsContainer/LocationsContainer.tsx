import React, { useEffect, useState, FC } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';

import OnboardingService from '@/services/api/onboarding';
import PanelService from '@/services/api/panel';
import { manageLoadingState } from '@/services/utils.service';
import { useCrossDataStore, useLocationsStore } from '@/store';
import { getFadeInProps } from '@/services/animations.service';

import Navigation from '../../navigation/Navigation';
import LocationsTopActions from '../locationsTopActions/LocationsTopActions';
import { LocationItem, LocationItemError } from '../locationItem/LocationItem';

import styles from './locationsContainer.module.sass';

interface Props {
  isInsidePanel?: boolean;
}

const LocationsContainer: FC<Props> = ({ isInsidePanel = false }) => {
  const router = useRouter();
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);
  const { locationsStateSetter } = useLocationsStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStores, setIsLoadingStores] = useState(true);

  const [activationSwitch, setActivationSwitch] = useState(false);
  const [showEmptyMsg, setShowEmptyMsg] = useState(true);
  const [locationsList, setLocationsList] = useState<any>([]);
  const invalidLocation = locationsList.some((loc) => loc.availableForDelivery && !loc.configured);
  const activeLocations = locationsList.some((loc) => loc.availableForDelivery && loc.configured);

  const getLocationsList = async () => {
    let list = [];
    if (isInsidePanel) {
      const { locations }: any = await PanelService.getPanelDocks();
      list = locations;
    } else {
      const { locations }: any = await OnboardingService.getDocks();
      list = locations;
    }
    setLocationsList(list);
    locationsStateSetter({ locations: list });
    verifyIfGeneralSwitchShouldBeChecked(list, setActivationSwitch);
    if (list.length !== 0) {
      setShowEmptyMsg(false);
    }
    setIsLoadingStores(false);
  };

  useEffect(() => {
    if (locationsList.length === 0) {
      getLocationsList();
    } else {
      setShowEmptyMsg(false);
    }
  }, []);

  useEffect(() => {
    verifyIfGeneralSwitchShouldBeChecked(locationsList, setActivationSwitch);
  }, [locationsList]);

  const verifyIfGeneralSwitchShouldBeChecked = (fullLocArr, switchStateSetter) => {
    let inCoverageLocations = fullLocArr.filter((loc) => loc.country === 'Argentina' && loc.inCoverage);
    let isAllActive = inCoverageLocations.every((loc) => loc.availableForDelivery);
    switchStateSetter(isAllActive);
    return isAllActive;
  };

  const handleChange = (e, index) => {
    let stateCopy = [...locationsList];
    let selectedObj = stateCopy.slice(index, index + 1);
    selectedObj[0].availableForDelivery = e.target.checked;
    stateCopy[index] = selectedObj[0];
    setLocationsList([...stateCopy]);
    verifyIfGeneralSwitchShouldBeChecked(stateCopy, setActivationSwitch);
    locationsStateSetter({ locations: stateCopy });
  };

  const handleActiveAll = (e) => {
    let stateCopy = locationsList;
    stateCopy.forEach((loc) => {
      if (loc.country === 'Argentina' && loc.inCoverage) {
        loc.availableForDelivery = e.target.checked;
      }
    });
    setLocationsList([...stateCopy]);
    setActivationSwitch(e.target.checked);
    locationsStateSetter({ locations: stateCopy });
  };

  const saveLocationsConfig = async () => {
    setIsLoading(true);
    manageLoadingState(setIsLoading);
    let result = null;
    if (isInsidePanel) {
      const { success }: any = await PanelService.configPanelDocks({ locations: locationsList });
      result = success;
      getLocationsList();
    } else {
      const { success }: any = await OnboardingService.configDocks({ locations: locationsList });
      result = success;
    }
    if (result) {
      locationsStateSetter({ locations: locationsList });
      router.push(
        `${isInsidePanel ? `/${ecommerceSelected}/panel/locations` : `/${ecommerceSelected}/onboarding/finish`}`,
      );
    }
  };

  let topActionsProps = {
    activationSwitch,
    handleActiveAll,
    ecommerceSelected,
    isInsidePanel,
    isLoadingStores,
    getLocationsList,
  };

  return (
    <div id={`${styles.locations_wrapper}`}>
      <div className={styles.locationListContainer}>
        <LocationsTopActions {...topActionsProps} />
        {isLoadingStores ? (
          <Skeleton count={1} height={200} style={{ marginBottom: '10px' }} />
        ) : (
          <>
            {showEmptyMsg && (
              <div className="empty-msg">
                <p>Aún no hay tiendas disponibles</p>
              </div>
            )}
            {locationsList.map((location, index) => (
              <motion.div {...getFadeInProps({ delay: 1.3 })} key={index}>
                {location?.country === 'Argentina' ? (
                  <LocationItem
                    index={index}
                    isInsidePanel={isInsidePanel}
                    ecommerce={ecommerceSelected}
                    handleChange={handleChange}
                    {...location}
                  />
                ) : (
                  <LocationItemError
                    index={index}
                    isInsidePanel={isInsidePanel}
                    ecommerce={ecommerceSelected}
                    {...location}
                  />
                )}
              </motion.div>
            ))}
          </>
        )}
      </div>
      <Navigation
        btnType="button"
        btnFn={saveLocationsConfig}
        btnTxt={isInsidePanel ? 'Guardar' : 'Continuar'}
        btnSpinner={isLoading}
        btnDisabled={!activeLocations || invalidLocation}
      />
    </div>
  );
};

export default LocationsContainer;
