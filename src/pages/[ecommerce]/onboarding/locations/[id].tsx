import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

import { getFadeInProps } from '@/services/animations.service';
import { noSpacedNameShortener, validateFullAddress } from '@/services/utils.service';
import { extractIdFromRoute, findLocationAndIndex } from '@/services/onboarding.service';
import { AppConfig } from '@/config/app';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { Logos } from '@/components/Logos';
import Stepper from '@/components/Onboarding/stepper/Stepper';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import LocationConfigForm from '@/components/Onboarding/forms/LocationConfigForm';

import stylesStepper from '@/components/Onboarding/stepper/stepper.module.sass';
import styles from './locations.module.sass';
import { useLocationsStore } from '@/store';

const SingleLocation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const currentLocationsList = useLocationsStore((state) => state.locations);
  const [selectedLocation, setSelectedLocation] = useState<any>({});
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);

  useEffect(() => {
    const pathId = extractIdFromRoute(location.pathname);
    findLocationAndIndex(currentLocationsList, 'locationId', pathId, setSelectedLocation, setSelectedLocationIndex);
    setIsLoading(false);
  }, []);

  return (
    <Main meta={<Meta title={`${AppConfig.site_name} - Vtex`} description="Single location Page" />}>
      <div className="container-fluid" id={`${styles.singleLocationPage}`}>
        <div className="row h-100">
          <div className="col-3 p-3">
            <div className={`${stylesStepper.stepper_container}`}>
              <Logos size="sm" variant="white" />
              <Stepper step={1} />
            </div>
          </div>
          {!isLoading && (
            <motion.div {...getFadeInProps({ delay: 1 })} className={`col-9 ${styles.content_wrapper}`}>
              <SectionTitles
                titleTxt={
                  selectedLocation?.name
                    ? noSpacedNameShortener(selectedLocation.name, 30)
                    : `Tienda ${selectedLocationIndex + 1}`
                }
                subTxt={validateFullAddress([
                  selectedLocation.address,
                  selectedLocation.city,
                  selectedLocation.province,
                ])}
              />
              <LocationConfigForm locationData={selectedLocation} />
            </motion.div>
          )}
        </div>
      </div>
    </Main>
  );
};

export default SingleLocation;
