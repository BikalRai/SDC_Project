import request from "@/utils/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  rentals: [],
  loading: false,
  error: null,
  success: false,
};

export const createRental = createAsyncThunk(
  "rental/createRental",
  async (rentalData, { rejectWithValue }) => {
    try {
      const res = await request.rent.create(rentalData);
      return res.data;
    } catch (error) {
      // ✅ Extract the message properly
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data ||
        "Failed to create rental";

      return rejectWithValue(message);
    }
  },
);

export const fetchMyRentals = createAsyncThunk(
  "rental/fetchMyRentals",
  async (_, { rejectWithValue }) => {
    try {
      const res = await request.rent.getRenterRentals();
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

const rentalSlice = createSlice({
  name: "rental",
  initialState,
  reducers: {
    resetRentalState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE RENTAL
      .addCase(createRental.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRental.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.rentals.push(action.payload);
      })
      .addCase(createRental.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH RENTALS
      .addCase(fetchMyRentals.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchMyRentals.fulfilled, (state, action) => {
        state.loading = false;
        state.rentals = action.payload;
      })
      .addCase(fetchMyRentals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRentalState } = rentalSlice.actions;
export default rentalSlice.reducer;
