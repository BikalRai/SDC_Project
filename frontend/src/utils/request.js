import api from "./api";

const request = {
  auth: {
    login: (data) => api.post("/auth/login", data),
    register: (data) => api.post("/auth/register", data),
    getCurrentUser: () => api.get("/user"),
  },
  item: {
    create: (data) => api.post("/item/create", data),
    items: () => api.get("/item/items"),
    getItem: (id) => api.get(`/item/${id}`),
    update: (id, data) => api.put(`/item/${id}/update`, data),
    delete: (id) => api.delete(`/item/${id}/delete`),
  },
  category: {
    categories: () => api.get("/category/categories"),
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
  },
};

export default request;
