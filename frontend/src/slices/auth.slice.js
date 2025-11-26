import request from "@/utils/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await request.auth.register(userData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed."
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await request.auth.login(userData);

      if (res) {
        localStorage.setItem("authToken", res.data?.accessToken);
        localStorage.setItem("refreshToken", res?.data.refreshToken);
      }

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed.");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");

      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed.");
    }
  }
);

export const loadUserFromToken = createAsyncThunk(
  "auth/loadUserFromToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        return rejectWithValue("No token found");
      }

      const res = await request.auth.getCurrentUser();

      return {
        user: res.data?.data,
        accessToken: token,
      };
    } catch (error) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");

      return rejectWithValue(
        error.response?.data?.message || "Session expired."
      );
    }
  }
);

const initialState = {
  user: null,
  authToken: localStorage.getItem("authToken") || null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("authToken"),
  successMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    setAuthFromToken: (state, action) => {
      state.user = action.payload.user;
      state.authToken = action.payload.token;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload || "Registration successful.";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
        state.authToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.successMessage = action.payload.message || "Login successfuly.";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.successMessage = "Logged out successfully.";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadUserFromToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUserFromToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
        state.authToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(loadUserFromToken.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.authToken = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearMessages, setAuthFromToken } = authSlice.actions;

export default authSlice.reducer;
