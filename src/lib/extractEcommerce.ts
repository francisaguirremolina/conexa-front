import { useCrossDataStore } from "@/store";
import { Ecommerce } from "./ecommerces";

export const extractAndSaveEcommerce = () => {
  let ecommerce = "";
  if (typeof window !== 'undefined') {
    const currentUrl = new URL(window.location.href);
    ecommerce = currentUrl.pathname.split('/')[1]!;
    useCrossDataStore.getState().ecommerceSetter(ecommerce as Ecommerce);
  }
  return ecommerce
}

export const extractEcommerceFromUrl = (stateSetter) => {
  let ecommerce = "";
  if (typeof window !== 'undefined') {
    const currentUrl = new URL(window.location.href);
    ecommerce = currentUrl.pathname.split('/')[1]!;
  }
  stateSetter(ecommerce);
  return ecommerce
}