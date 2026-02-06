import request from "@/utils/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  item: null,
  error: null,
  items: [],
  successMessage: null,
  allItems: [],
};

export const addItem = createAsyncThunk(
  "item/addItem",
  async (data, { rejectWithValue }) => {
    try {
      const res = await request.item.create(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create item",
      );
    }
  },
);

export const getAllItems = createAsyncThunk(
  "item/items",
  async (filter = {}, { rejectWithValue }) => {
    try {
      const res = await request.item.items(filter);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const getSearchItems = createAsyncThunk(
  "item/search",
  async (filter, { rejectWithValue }) => {
    try {
      const res = await request.item.searchItems(filter);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const getUserListedItems = createAsyncThunk(
  "item/user",
  async (_, { rejectWithValue }) => {
    try {
      const res = await request.item.userItems();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const fetchItemById = createAsyncThunk(
  "item/get",
  async (id, { rejectWithValue }) => {
    try {
      const res = await request.item.getItem(id);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const updateItem = createAsyncThunk(
  "item/update",
  async (data, { rejectWithValue }) => {
    try {
      const { id, updateData } = data;

      const res = await request.item.update(id, updateData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update item.",
      );
    }
  },
);

export const deleteItem = createAsyncThunk(
  "item/delete",
  async (id, { rejectWithValue }) => {
    try {
      await request.item.delete(id);
      return { id, message: "Delete item successfully." };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete item.",
      );
    }
  },
);

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    clearMessages: (state) => {
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
        state.successMessage = "Created item successfully.";
      })
      .addCase(addItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = null;
      })
      .addCase(getAllItems.pending, (state) => {
        if (state.items.length === 0) {
          state.loading = true;
        }
        state.error = null;
        state.successMessage = null;
      })
      .addCase(getAllItems.fulfilled, (state, action) => {
        state.loading = false;
        state.allItems = action.payload.data;
      })
      .addCase(getAllItems.rejected, (state, action) => {
        state.loading = false;
        state.successMessage = null;
        state.error = action.payload;
      })
      .addCase(getUserListedItems.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(getUserListedItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(getUserListedItems.rejected, (state, action) => {
        state.loading = false;
        state.successMessage = null;
        state.items = [];
        state.error = action.payload;
      })
      .addCase(fetchItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loading = false;
        state.successMessage = null;
        state.error = action.payload;
      })
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;

        const updatedItem = action.payload;

        state.items = state.items.map((item) =>
          item.id === updatedItem.id ? updatedItem : item,
        );

        state.item = updatedItem;

        state.successMessage = "Updated item successfully.";
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.successMessage = null;
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
        const deletedId = action.payload.id;
        state.items = state.items.filter((item) => item.id !== deletedId);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.successMessage = null;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = itemSlice.actions;

export default itemSlice.reducer;
