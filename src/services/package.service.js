import api from './api';

const PackageService = {
  /**
   * Fetch all packages
   * @returns {Promise} Axios response promise
   */
  getPackages: () => {
    return api.get('/packages');
  },

  /**
   * Fetch a single package by ID
   * @param {string|number} id - Package ID
   * @returns {Promise} Axios response promise
   */
  getPackageById: (id) => {
    return api.get(`/packages/${id}`);
  }
};

export default PackageService;
