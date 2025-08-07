import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

import { getFadeInProps } from '@/services/animations.service';
import { noSpacedNameShortener, validateFullAddress } from '@/services/utils.service';
import { extractIdFromRoute, findLocationAndIndex } from '@/services/onboarding.service';
import SectionTitles from '@/components/Onboarding/sectionTitles/SectionTitles';
import LocationConfigForm from '@/components/Onboarding/forms/LocationConfigForm';

import styles from '../../onboarding/locations/locations.module.sass';
import { PanelLayout } from '@/layouts/PanelLayout';
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
    <PanelLayout>
      <div style={{ maxWidth: '90%', margin: '0 auto', height: '100%' }}>
        {!isLoading && (
          <motion.div {...getFadeInProps({ delay: 1 })} className={`col-9 ${styles.content_wrapper}`}>
            <SectionTitles
              titleTxt={
                selectedLocation?.name
                  ? noSpacedNameShortener(selectedLocation.name, 30)
                  : `Tienda ${selectedLocationIndex + 1}`
              }
              subTxt={validateFullAddress([
                selectedLocation?.address,
                selectedLocation?.city,
                selectedLocation?.province,
              ])}
            />
            <LocationConfigForm locationData={selectedLocation} isInsidePanel={true} />
          </motion.div>
        )}
      </div>
    </PanelLayout>
  );
};

export default SingleLocation;
