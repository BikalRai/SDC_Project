import request from "@/utils/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  rentals: [],
  loading: false,
  error: null,
  success: false,
  rent: null,
};

export const createRental = createAsyncThunk(
  "rental/createRental",
  async (rentalData, { rejectWithValue }) => {
    try {
      const res = await request.rent.create(rentalData);
      // console.log(res);
      return res.data.data;
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
      console.log(res.data.data, "data");
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const getRentItemById = createAsyncThunk(
  "rental/rentItem",
  async (id, { rejectWithValue }) => {
    try {
      const res = await request.rent.getRentItemById(id);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const returnRentItem = createAsyncThunk(
  "rental/return",
  async (token, { rejectWithValue }) => {
    try {
      const res = await request.rent.returnRentItem(token);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const confirmPayment = createAsyncThunk(
  "rental/confirm",
  async (id, { rejectWithValue }) => {
    try {
      const res = await request.rent.confirmPayment(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const cancelRent = createAsyncThunk(
  "rental/cancel",
  async (rentalId, { rejectWithValue }) => {
    try {
      const res = await request.rent.cancelRent(rentalId);

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
        state.rentals = [...state.rentals, action.payload];
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
        console.log(action, "action");
        state.loading = false;
        state.rentals = action.payload;
      })
      .addCase(fetchMyRentals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRentItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getRentItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.rent = action.payload;
        state.success = "Rent item retrieved.";
      })
      .addCase(getRentItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(returnRentItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(returnRentItem.fulfilled, (state, action) => {
        state.loading = false;
        state.rent = action.payload;
        state.success = "Returned item successfully";
      })
      .addCase(returnRentItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(confirmPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(confirmPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.rent = action.payload;
        state.success = "Updated status successfuly.";
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelRent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(cancelRent.fulfilled, (state, action) => {
        state.loading = false;
        state.rent = action.payload.data;
        state.success = "Cancelled rent successfuly.";
      })
      .addCase(cancelRent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRentalState } = rentalSlice.actions;
export default rentalSlice.reducer;
