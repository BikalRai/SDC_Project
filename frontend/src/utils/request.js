import api from "./api";

const request = {
  auth: {
    login: (data) => api.post("/auth/login", data),
    register: (data) => api.post("/auth/register", data),
    getCurrentUser: () => api.get("/user"),
  },
  user: {
    update: (data) => api.put("/user/update", data),
  },
  item: {
    create: (data) => api.post("/item/create", data),
    items: (params = {}) => api.get("/item/items", { params }),
    userItems: () => api.get("/item/items/user"),
    getItem: (id) => api.get(`/item/${id}`),
    update: (id, data) => api.put(`/item/update/${id}`, data),
    delete: (id) => api.delete(`/item/delete/${id}`),
  },
  kyc: {
    create: (formData) =>
      api.post("/kyc/create", {
        ...formData,
      }),
    getAllKycs: () => api.get("/kyc/kycs"),
    getKycByLoggedInUser: () => api.get("/kyc/user"),
    getKycById: (id) => api.get(`/kyc/${id}`),
    updateKyc: (id, data) =>
      api.put(`/kyc/update/${id}`, {
        ...data,
      }),
    updateKycStatus: (id, status) =>
      api.patch(`/kyc/update/status/${id}`, {
        status,
      }),
    deleteKyc: (id) => api.delete(`/kyc/delete/${id}`),
  },
  rent: {
    create: (rentData) =>
      api.post("/rental/rent", {
        ...rentData,
      }),
    getRenterRentals: () => api.get("/rental/rents/renter"),
    getRentItemById: (id) => api.get(`/rental/rent/${id}`),
    returnRentItem: (token) => api.patch(`/rental/return/${token}`),
  },
  admin: {
    getDashboardStats: () => api.get("/admin/dashboard/stats"),
  },
};

export default request;
