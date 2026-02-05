import request from "@/utils/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAdminDashboardStats = createAsyncThunk(
  "admin/stats",
  async (__, { rejectwithValue }) => {
    try {
      const res = await request.admin.getDashboardStats();
      return res.data;
    } catch (error) {
      return rejectwithValue(error?.response?.message);
    }
  },
);

const initialState = {
  stats: null,
  success: null,
  error: null,
  loading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getAdminDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
        state.error = null;
        state.success = "Retrieved stats";
      })
      .addCase(getAdminDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
