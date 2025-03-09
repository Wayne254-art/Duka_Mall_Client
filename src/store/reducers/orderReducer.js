import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

// Place Order
export const place_order = createAsyncThunk(
    'order/place_order',
    async ({ price, products, shipping_fee, shippingInfo, userId, navigate, items }, { rejectWithValue }) => {
        try {
            const { data } = await api.post('/home/order/place-order', {
                price,
                products,
                shipping_fee,
                shippingInfo,
                userId,
                items,
            });

            navigate('/payment', {
                state: {
                    price: price + shipping_fee,
                    items,
                    orderId: data.orderId,
                },
            });

            console.log(data);
            return true;
        } catch (error) {
            console.error(error.response);
            return rejectWithValue(error.response?.data || "An error occurred while placing the order");
        }
    }
);

// Get Orders
export const get_orders = createAsyncThunk(
    'order/get_orders',
    async ({ customerId, status }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/home/customer/get-orders/${customerId}/${status}`);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error.response);
            return rejectWithValue(error.response?.data || "Failed to fetch orders");
        }
    }
);

// Get Order
export const get_order = createAsyncThunk(
    'order/get_order',
    async (orderId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/home/customer/get-order/${orderId}`);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error.response);
            return rejectWithValue(error.response?.data || "Failed to fetch order details");
        }
    }
);

// Order Reducer
export const orderReducer = createSlice({
    name: 'order',
    initialState: {
        myOrders: [],
        errorMessage: '',
        successMessage: '',
        myOrder: {},
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = '';
            state.successMessage = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_orders.fulfilled, (state, { payload }) => {
                state.myOrders = payload.orders;
            })
            .addCase(get_orders.rejected, (state, { payload }) => {
                state.errorMessage = payload;
            })
            .addCase(get_order.fulfilled, (state, { payload }) => {
                state.myOrder = payload.order;
            })
            .addCase(get_order.rejected, (state, { payload }) => {
                state.errorMessage = payload;
            })
            .addCase(place_order.rejected, (state, { payload }) => {
                state.errorMessage = payload;
            });
    },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
