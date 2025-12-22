import request from "@/utils/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  kycs: [],
  kyc: null,
  loading: false,
  error: null,
  successMessage: null,
};

export const createKyc = createAsyncThunk(
  "/kyc/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await request.kyc.create(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create KYC"
      );
    }
  }
);

export const getKycByLoggedInUser = createAsyncThunk(
  "/kyc/user",
  async (_, { rejectWithValue }) => {
    try {
      const res = await request.getKycByLoggedInUser();
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load KYC"
      );
    }
  }
);

export const getKycById = createAsyncThunk(
  "/kyc/id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await request.getKycById(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load KYC"
      );
    }
  }
);

export const getAllKycs = createAsyncThunk(
  "/kyc/kycs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await request.getAllKycs();
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load all KYCs"
      );
    }
  }
);

export const updateKyc = createAsyncThunk(
  "/kyc/kycs",
  async (data, { rejectWithValue }) => {
    try {
      const { id, updateData } = data;
      const res = await request.updateKyc(id, updateData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update KYC"
      );
    }
  }
);

export const updateKycStatus = createAsyncThunk(
  "/kyc/kycs",
  async (data, { rejectWithValue }) => {
    try {
      const { id, updateData } = data;
      const res = await request.updateKycStatus(id, updateData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update KYC"
      );
    }
  }
);

export const deleteKyc = createAsyncThunk(
  "kyc/delete",
  async (id, { rejectWithValue }) => {
    try {
      await request.deleteKyc(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete KYC"
      );
    }
  }
);

const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createKyc.pending, (state) => {
        (state.loading = true), (state.error = null);
        state.successMessage = null;
      })
      .addCase(createKyc.fulfilled, (state, action) => {
        state.loading = false;
        state.kyc = action.payload;
        state.successMessage = "Created KYC successfully.";
      })
      .addCase(createKyc.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
        state.successMessage = null;
      });
  },
});

export default kycSlice.reducer;
