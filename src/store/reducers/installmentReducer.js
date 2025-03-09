import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const apply__for_installments = createAsyncThunk(
    'apply__for_installments',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await api.post("/installments/apply", formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const get_customer_installment_products = createAsyncThunk(
    'get_customer_installment_products',
    async (customerId, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`/installments/customer/${customerId}`)
            return data;
        } catch (error) {
            return rejectWithValue(error.data)
        }
    }
)

export const fetch_seller_installments = createAsyncThunk(
    'fetch_seller_installments',
    async (sellerId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/installments/seller/${sellerId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });

export const fetch_all_installments = createAsyncThunk(
    'fetch_all_installments',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/installments/admin/all");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });

const installmentSlice = createSlice({
    name: "installments",
    initialState: { 
        applications: [], 
        installmentProducts: [],
        loading: false, 
        error: null ,
        successMessage: null
    },
    reducers: {
        clearMessage: (state) => {
            state.successMessage = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(apply__for_installments.pending, (state) => {
                state.loading = true;
            })
            .addCase(apply__for_installments.fulfilled, (state, action) => {
                state.loading = false;
                state.applications.push(action.payload);
            })
            .addCase(apply__for_installments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(get_customer_installment_products.pending, (state) => {
                state.loading = true
            })
            .addCase(get_customer_installment_products.fulfilled, (state, { payload }) => {
                state.installmentProducts = payload.installmentProducts
                state.loading = false
            })
            .addCase(get_customer_installment_products.rejected, (state, { payload }) => {
                state.errorMessage = payload
                state.loading = false
            })
            .addCase(fetch_seller_installments.fulfilled, (state, action) => {
                state.applications = action.payload
            })
            .addCase(fetch_all_installments.fulfilled, (state, action) => {
                state.applications = action.payload
            });
    },
});

export const { clearMessage } = installmentSlice.actions
export default installmentSlice.reducer;