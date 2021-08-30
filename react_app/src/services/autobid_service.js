// AutoBidService
import axiosInstance from "./api_config";

const getSettings = (userId) => {
  
  return axiosInstance.get(`auto_bid/${userId}`);
};
  
const update = (userId, max_amount) => {
    return axiosInstance.patch(`auto_bid/${userId}/`, {
      max_amount,

    });
  };


  export default {
    getSettings,
    update
};
    
