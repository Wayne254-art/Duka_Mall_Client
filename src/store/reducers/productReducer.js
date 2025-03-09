
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

const initialState = {
  discountedProducts: [],
  isLoading: false,
  error: null,
};

export const fetch_random_discounted_products = createAsyncThunk(
  'products/fetch_random_discounted_products',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/products/random/discounted');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch_random_discounted_products.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetch_random_discounted_products.fulfilled, (state, action) => {
        state.isLoading = false;
        state.discountedProducts = action.payload;
      })
      .addCase(fetch_random_discounted_products.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
