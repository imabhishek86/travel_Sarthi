import api from './api';

const HotelService = {
  /**
   * Fetch all hotels
   * @returns {Promise} Axios response promise
   */
  getHotels: () => {
    return api.get('/hotels');
  },

  /**
   * Fetch a single hotel by ID
   * @param {string|number} id - Hotel ID
   * @returns {Promise} Axios response promise
   */
  getHotelById: (id) => {
    return api.get(`/hotels/${id}`);
  }
};

export default HotelService;
