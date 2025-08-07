import { HttpService } from '../../lib/http-common';

class OnboardingService extends HttpService {
  constructor() {
    super('onboarding');
  }

  async getInitialState() {
    return this.get('initial-state');
  }

  async authClient(values) {
    return this.post('auth-oca', { ...values });
  }

  async newAuth(values) {
    return this.post('new-auth', { ...values });
  }

  async sendUserConfig(values, locationId?) {
    return this.put('user', values, { params: { locationId } });
  }

  async getAvailableStores(postalCodeValue, userId?) {
    if (userId) return this.get('nearby-stores', { params: { postalCode: postalCodeValue, userId } });
    return this.get('nearby-stores', { params: { postalCode: postalCodeValue } });
  }

  async getDeliveryStores(postalCodeValue) {
    return this.get('nearby-stores-delivery', { params: { postalCode: postalCodeValue } });
  }

  async confirmCarrier(values?: object) {
    return this.post('create-shipping', { ...values });
  }

  async getOperationals(userId, locationId?) {
    if (!locationId) return this.get('get-operationals', { params: { userId } });
    return this.get('operational', { params: { userId, locationId } });
  }

  //vtex
  async logInVtex(values) {
    return this.post('auth/login', { ...values });
  }

  async authVtex(values) {
    return this.post('auth-vtex', { ...values });
  }

  async getDocks() {
    return this.get('docks');
  }

  async updateDocks(values) {
    return this.put('docks', { ...values });
  }

  async configDocks(values) {
    return this.post('docks', { ...values });
  }

  async getAccount(locationId) {
    return this.get('operational', { params: { locationId } });
  }

  async configAccount(values, locationId): Promise<any> {
    return this.post('operational', { ...values }, { params: { locationId } });
  }

  async getDispatchType(postalCodeValue, locationId) {
    return this.get('dispatch', { params: { postalCode: postalCodeValue, locationId } });
  }
}

export default new OnboardingService();
