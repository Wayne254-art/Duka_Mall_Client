import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import jwt from 'jwt-decode';

export const customer_register = createAsyncThunk(
  'auth/customer_register',
  async (info, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/customer/customer-register', info);
      localStorage.setItem('customerToken', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const customer_login = createAsyncThunk(
  'auth/customer_login',
  async (info, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/customer/customer-login', info);
      localStorage.setItem('customerToken', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const forgot_password = createAsyncThunk(
  'auth/forgot_password',
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/customer/forgot-password', { email });
      return { email, message: data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const verify_otp = createAsyncThunk(
  'auth/verify_otp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/customer/verify-otp', { email, otp });
      return { email, otp, message: data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const reset_password = createAsyncThunk(
  'auth/reset_password',
  async ({ newPassword }, { getState, rejectWithValue }) => {
    try {
      const { email, otp } = getState().auth;
      if (!email || !otp) {
        return rejectWithValue("Session expired. Please request a new OTP.");
      }
      const { data } = await api.post('/customer/reset-password', { email, otp, newPassword });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const decodeToken = (token) => (token ? jwt(token) : '');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loader: false,
    userInfo: decodeToken(localStorage.getItem('customerToken')),
    errorMessage: '',
    successMessage: '',
    email: null,
    otp: null,
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = '';
      state.successMessage = '';
    },
    user_reset: (state) => {
      state.userInfo = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(customer_register.pending, (state) => {
        state.loader = true;
      })
      .addCase(customer_register.fulfilled, (state, { payload }) => {
        state.userInfo = decodeToken(payload.token);
        state.successMessage = payload.message;
        state.loader = false;
      })
      .addCase(customer_register.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || 'Registration failed';
        state.loader = false;
      })
      .addCase(customer_login.pending, (state) => {
        state.loader = true;
      })
      .addCase(customer_login.fulfilled, (state, { payload }) => {
        state.userInfo = decodeToken(payload.token);
        state.successMessage = payload.message;
        state.loader = false;
      })
      .addCase(customer_login.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || 'Login failed';
        state.loader = false;
      })
      .addCase(forgot_password.pending, (state) => {
        state.loader = true;
      })
      .addCase(forgot_password.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.email = payload.email;
        state.loader = false;
      })
      .addCase(forgot_password.rejected, (state, { payload }) => {
        state.errorMessage = payload?.message || 'Request failed';
        state.loader = false;
      })
      .addCase(verify_otp.pending, (state) => {
        state.loader = true;
      })
      .addCase(verify_otp.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.email = payload.email;
        state.otp = payload.otp;
        state.loader = false;
      })
      .addCase(verify_otp.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || 'OTP verification failed';
        state.loader = false;
      })
      .addCase(reset_password.pending, (state) => {
        state.loader = true;
      })
      .addCase(reset_password.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.email = null;
        state.otp = null;
        state.loader = false;
      })
      .addCase(reset_password.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || 'Password reset failed';
        state.loader = false;
      });
  },
});

export const { messageClear, user_reset } = authSlice.actions;
export default authSlice.reducer;
