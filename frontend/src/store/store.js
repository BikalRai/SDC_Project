import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth.slice";
import itemReducer from "../slices/item.slice";
import categoryReducer from "../slices/category.slice";
import kycReducer from "../slices/kyc.slice";
import rentReducer from "../slices/rent.slice";
import userReducer from "../slices/user.slice";
import adminReducer from "../slices/admin.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    item: itemReducer,
    category: categoryReducer,
    kyc: kycReducer,
    rent: rentReducer,
    admin: adminReducer,
  },
});

export default store;
