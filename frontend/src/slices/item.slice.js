import request from "@/utils/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  item: null,
  error: null,
  items: [],
  successMessage: null,
};

export const addItem = createAsyncThunk(
  "item/addItem",
  async (data, { rejectWithValue }) => {
    try {
      const res = await request.item.create(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create item"
      );
    }
  }
);

export const getAllItems = createAsyncThunk(
  "item/items",
  async (_, { rejectWithValue }) => {
    try {
      const res = await request.item.items();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "item/delete",
  async (id, { rejectWithValue }) => {
    try {
      await request.item.delete(id);
      return { id, message: "Delete item successfully." };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete item."
      );
    }
  }
);

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    clearAddItemMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
        state.successMessage = "Created message successfully.";
      })
      .addCase(addItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = null;
      })
      .addCase(getAllItems.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(getAllItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(getAllItems.rejected, (state, action) => {
        state.loading = false;
        state.successMessage = null;
        state.items = [];
        state.error = action.payload;
      })
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.successMessage = null;
        state.error = action.payload;
      });
  },
});

export const { clearAddItemMessages } = itemSlice.actions;

export default itemSlice.reducer;
