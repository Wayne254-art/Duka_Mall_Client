
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api'

export const addSubscription = createAsyncThunk(
  'subscription/addSubscription',
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post('/subscribe', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState: {
    loading: false,
    success: false,
    error: null,
    message: '',
  },
  reducers: {
    resetSubscriptionState: (state) => {
      state.success = false;
      state.error = null;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(addSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { resetSubscriptionState } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
