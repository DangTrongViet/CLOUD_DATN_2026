import axiosClient from "../services/axiosClient";

const authAPI = {
  register: (data) => axiosClient.post("/auth/register/", data),
  login: (data) => axiosClient.post("/auth/login/", data),
  logout: () => axiosClient.post("/auth/logout/"),
  getProfile: () => axiosClient.get("/auth/profile/"),
  updateProfile: (data) => axiosClient.put("/auth/profile/", data),
};

export default authAPI;
