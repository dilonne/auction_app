
import axiosInstance from "./api_config";



const login = (username) => {
  return axiosInstance.post("user_auth/login/", {username})
    .then((response) => {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export default {
  login,
  logout,
  getCurrentUser,
};

