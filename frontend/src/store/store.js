import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth.slice";
import itemReducer from "../slices/item.slice";
import categoryReducer from "../slices/category.slice";
import kycReducer from "../slices/kyc.slice";
import rentReducer from "../slices/rent.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
    category: categoryReducer,
    kyc: kycReducer,
    rent: rentReducer,
  },
});

export default store;
