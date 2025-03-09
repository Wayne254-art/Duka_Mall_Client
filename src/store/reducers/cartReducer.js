
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

const handleAsyncThunk = async (method, url, payload = null, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api[method](url, payload);
        return fulfillWithValue(data);
    } catch (error) {
        return rejectWithValue(error.response?.data || { error: 'Something went wrong' });
    }
};

export const add_to_cart = createAsyncThunk('cart/add_to_cart', (info, thunkAPI) => 
    handleAsyncThunk('post', '/home/product/add-to-cart', info, thunkAPI)
);

export const get_cart_products = createAsyncThunk('cart/get_cart_products', (userId, thunkAPI) => 
    handleAsyncThunk('get', `/home/product/get-cart-product/${userId}`, null, thunkAPI)
);

export const delete_cart_product = createAsyncThunk('cart/delete_cart_product', (cart_id, thunkAPI) => 
    handleAsyncThunk('delete', `/home/product/delete-cart-product/${cart_id}`, null, thunkAPI)
);

export const quantity_inc = createAsyncThunk('cart/quantity_inc', (cart_id, thunkAPI) => 
    handleAsyncThunk('put', `/home/product/quantity-inc/${cart_id}`, null, thunkAPI)
);

export const quantity_dec = createAsyncThunk('cart/quantity_dec', (cart_id, thunkAPI) => 
    handleAsyncThunk('put', `/home/product/quantity-dec/${cart_id}`, null, thunkAPI)
);

export const add_to_wishlist = createAsyncThunk('wishlist/add_to_wishlist', (info, thunkAPI) => 
    handleAsyncThunk('post', '/home/product/add-to-wishlist', info, thunkAPI)
);

export const get_wishlist_products = createAsyncThunk('wishlist/get_wishlist_products', (userId, thunkAPI) => 
    handleAsyncThunk('get', `/home/product/get-wishlist-products/${userId}`, null, thunkAPI)
);

export const remove_wishlist = createAsyncThunk('wishlist/remove_wishlist', (wishlistId, thunkAPI) => 
    handleAsyncThunk('delete', `/home/product/delete-wishlist-product/${wishlistId}`, null, thunkAPI)
);

const initialState = {
    cart_products: [],
    cart_product_count: 0,
    buy_product_item: 0,
    wishlist_count: 0,
    wishlist: [],
    price: 0,
    errorMessage: '',
    successMessage: '',
    shipping_fee: 0,
    outofstock_products: []
};

const cartReducer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        messageClear: (state) => {
            state.errorMessage = '';
            state.successMessage = '';
        },
        reset_count: (state) => {
            state.cart_product_count = 0;
            state.wishlist_count = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_to_cart.rejected, (state, { payload }) => {
                state.errorMessage = payload?.error || 'Failed to add to cart';
            })
            .addCase(add_to_cart.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.cart_product_count += 1;
            })
            .addCase(get_cart_products.fulfilled, (state, { payload }) => {
                Object.assign(state, payload);
            })
            .addCase(delete_cart_product.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })
            .addCase(quantity_inc.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })
            .addCase(quantity_dec.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })
            .addCase(add_to_wishlist.rejected, (state, { payload }) => {
                state.errorMessage = payload?.error || 'Failed to add to wishlist';
            })
            .addCase(add_to_wishlist.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.wishlist_count = state.wishlist_count ? state.wishlist_count + 1 : 1;
            })
            .addCase(get_wishlist_products.fulfilled, (state, { payload }) => {
                state.wishlist = payload.wishlists;
                state.wishlist_count = payload.wishlistCount;
            })
            .addCase(remove_wishlist.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.wishlist = state.wishlist.filter(p => p._id !== payload.wishlistId);
                state.wishlist_count -= 1;
            });
    }
});

export const { messageClear, reset_count } = cartReducer.actions;
export default cartReducer.reducer;
