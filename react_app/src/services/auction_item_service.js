// AuctionItemService

import axiosInstance from "./api_config";


const getAll = () => {
    return axiosInstance.get("auction_items/");
  };

const get = (pk) => {
    return axiosInstance.get(`auction_items/${pk}/`);
  };





  export default {
    get,
    getAll
  };