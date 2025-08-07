import { AxiosRequestConfig } from 'axios';
import { HttpService } from '../../lib/http-common';

class PanelService extends HttpService {
  constructor() {
    super('panel');
  }

  async getOrders(
    from = 0,
    limit = 5,
    dateFrom = '1970-01-01T00:00:00Z',
    dateTo = new Date().toISOString(),
    status = 'all',
    dispatchType = 'all',
    sort = -1,
    tag = '',
  ) {
    return this.get('orders', { params: { from, limit, dateFrom, dateTo, status, delivery: dispatchType, sort, tag } });
  }

  async getSingleOrder(orderId) {
    return this.get('order', { params: { orderId: orderId } });
  }

  async editSingleOrder(values, orderId) {
    return this.put('order', values, { params: { orderId: orderId } });
  }

  async fulfillNewOrders(values) {
    return this.post('newOrders', values); // TODO use one of two endpoints
  }

  async cancelOrders(values) {
    return this.post('orders/cancel', values);
  }

  // print

  async printOrders(values: { orderIds: string[] }, config?: AxiosRequestConfig) {
    return this.post('orders/labels', values, config);
  }

  async getPrintSettings() {
    return this.get('print/settings');
  }

  async printSettings(values) {
    return this.put('print/settings', values);
  }

  async getReceiptGeneralConfig() {
    return this.get('receipt');
  }

  async setReceiptGeneralConfig(values) {
    return this.put('receipt', values);
  }

  async getLogInData() {
    return this.get('account');
  }

  async editLogInData(values) {
    return this.put('account', values);
  }

  //account

  async revalidateLogin(values) {
    return this.post('account', values);
  }

  async sendPanelUserConfig(values, locationId) {
    return this.put('account', values, { params: { locationId } });
  }

  async getPanelAccount(locationId) {
    return this.get('operational', { params: { locationId } });
  }

  async configPanelAccount(values, locationId): Promise<any> {
    return this.post('operational', { ...values }, { params: { locationId } });
  }

  //docks

  async getPanelDocks() {
    return this.get('docks');
  }

  async updatePanelDocks(values) {
    return this.put('docks', { ...values });
  }

  async configPanelDocks(values) {
    return this.post('docks', { ...values });
  }

  //dispatch

  async getAvailableStoresPanel(postalCodeValue, userId?) {
    if (userId) return this.get('nearby-stores', { params: { postalCode: postalCodeValue, userId } });
    return this.get('nearby-stores', { params: { postalCode: postalCodeValue } });
  }

  async getDispatchType(postalCodeValue, locationId) {
    return this.get('dispatch', { params: { postalCode: postalCodeValue, locationId } });
  }

  //orders

  async getPendingSettings() {
    return this.get('account/settings');
  }
}

export default new PanelService();
