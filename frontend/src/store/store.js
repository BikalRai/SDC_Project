import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth.slice";
import itemReducer from "../slices/item.slice";
import categoryReducer from "../slices/category.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
    category: categoryReducer,
  },
});

export default store;
