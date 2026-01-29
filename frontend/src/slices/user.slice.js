import request from "@/utils/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getLoggedInUserDetails = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await request.auth.getCurrentUser();
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "User not retrieved.",
      );
    }
  },
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (data, { rejectWithValue }) => {
    try {
      console.log("hit!!");
      const res = await request.user.update(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "User not updated.",
      );
    }
  },
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoggedInUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(getLoggedInUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.successMessage = null;
      })
      .addCase(getLoggedInUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.successMessage = "User updated successfully.";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
