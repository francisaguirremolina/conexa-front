import React, { useEffect, useState, FC } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';

import OnboardingService from '@/services/api/onboarding';
import PanelService from '@/services/api/panel';
import { manageLoadingState, manuallyShowError } from '@/services/utils.service';
import { getFadeInProps } from '@/services/animations.service';

import Navigation from '../../navigation/Navigation';

import styles from './accountContainer.module.sass';
import AccountItem from '../accountItem/AccountItem';
import { useCrossDataStore } from '@/store';

interface Props {
  isInsidePanel?: boolean;
}

const AccountContainer: FC<Props> = ({ isInsidePanel = false }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStores, setIsLoadingStores] = useState(true);
  const [showEmptyMsg, setShowEmptyMsg] = useState(false);
  const [accountList, setAccountList] = useState<any>([]);
  const [existingActiveAccount, setExistingActiveAccount] = useState(false);
  const ecommerceSelected = useCrossDataStore((state) => state.ecommerce.id);

  const { locationId, postalCode } = router.query;

  const getAccountList = async () => {
    let result: any[] = [];
    if (isInsidePanel) {
      const { data }: any = await PanelService.getPanelAccount(locationId);
      result = data;
    } else {
      const { data }: any = await OnboardingService.getAccount(locationId);
      result = data;
    }

    const operativesFilterByDock = result.map((obj) => {
      const validation = !obj.dockIds.includes(locationId);
      return { ...obj, selected: !validation };
    });

    setAccountList(operativesFilterByDock);
    if (result.length !== 0) {
      setShowEmptyMsg(false);
    }
    setIsLoadingStores(false);
  };

  useEffect(() => {
    if (accountList.length === 0) {
      getAccountList();
      verifyExistingActiveAccount();
    } else {
      setShowEmptyMsg(false);
    }
  }, []);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);

  const verifyExistingActiveAccount = () => {
    setExistingActiveAccount(accountList.some((account) => account.selected));
  };

  const handleChange = (e, index) => {
    const selectedAccount = accountList[index];
    const destination = selectedAccount.accountType.split(' ').pop();

    if (destination === 'Puerta' || destination === 'Sucursal') {
      const isValidDestination = selectedDestinations.includes(destination);
      if (isValidDestination && selectedAccount.selected) {
        setSelectedDestinations(selectedDestinations.filter((d) => d !== destination));
      } else if (isValidDestination) {
        return manuallyShowError('No es posible seleccionar dos operativas con el mismo punto de destino.');
      } else {
        setSelectedDestinations([...selectedDestinations, destination]);
      }
    }

    const updatedAccountList = accountList.map((account, currentIndex) => {
      if (currentIndex === index) {
        let newDockIds = [locationId];
        if (e.target.checked) {
          if (!newDockIds.includes(locationId)) {
            newDockIds.push(locationId);
          }
        } else {
          newDockIds = account.dockIds.filter((id) => id !== locationId);
        }

        return {
          ...account,
          selected: e.target.checked,
          dockIds: newDockIds,
        };
      }
      return account;
    });
    setAccountList(updatedAccountList);

    verifyExistingActiveAccount();
  };

  const saveAccountConfig = async () => {
    setIsLoading(true);
    manageLoadingState(setIsLoading);
    let result = null;
    let redirect;
    if (isInsidePanel) {
      const { success }: any = await PanelService.configPanelAccount({ data: accountList }, locationId);
      result = success;
      redirect = `/${ecommerceSelected}/panel/account?postalCode=${postalCode}&locationId=${locationId}`;
    } else {
      const { success }: any = await OnboardingService.configAccount({ data: accountList }, locationId);
      result = success;
      redirect = `/${ecommerceSelected}/onboarding/locations`;
    }
    if (result) {
      router.push(redirect);
    }
  };

  const previousRouteByEcommerce = isInsidePanel
    ? `/${ecommerceSelected}/panel/dispatch?postalCode=${postalCode}&locationId=${locationId}`
    : `/${ecommerceSelected}/onboarding/dispatch?postalCode=${postalCode}&locationId=${locationId}`;

  return (
    <div id={`${isInsidePanel ? styles.account_wrapper_panel : styles.account_wrapper}`}>
      <div className={styles.accountListContainer}>
        {isLoadingStores ? (
          <Skeleton count={1} height={200} style={{ marginBottom: '10px' }} />
        ) : (
          <>
            {showEmptyMsg && (
              <div className="empty-msg">
                <p>Aún no hay tiendas disponibles</p>
              </div>
            )}
            {accountList.map((item, index) => (
              <motion.div {...getFadeInProps({ delay: 1.3 })} key={index}>
                <AccountItem
                  index={index}
                  accountNumber={item.accountNumber}
                  accountType={item.accountType}
                  selected={item.selected}
                  handleChange={handleChange}
                />
              </motion.div>
            ))}
          </>
        )}
      </div>
      <Navigation
        linkHref={previousRouteByEcommerce}
        btnType="button"
        btnFn={saveAccountConfig}
        btnTxt={isInsidePanel ? 'Guardar' : 'Continuar'}
        btnSpinner={isLoading}
        btnDisabled={!existingActiveAccount}
      />
    </div>
  );
};

export default AccountContainer;
