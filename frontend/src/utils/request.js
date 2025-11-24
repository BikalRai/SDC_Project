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
};

export default request;
