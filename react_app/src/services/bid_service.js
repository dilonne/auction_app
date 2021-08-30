// BidService
import axiosInstance from "./api_config";


const bid = (auction_item, price, auto_bidding) => {
    return axiosInstance.post("bids/" , {
      auction_item,
      price,
      auto_bidding
    });
  };


  const getAllFor = (pk) => {
    return axiosInstance.get("bids/{pk}");
  };


export default {
  bid,
  getAllFor
  };
  