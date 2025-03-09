
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_dashboard_index_data = createAsyncThunk(
    "dashboard/get_dashboard_index_data",
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`/home/customer/get-dashboard-data/${userId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Failed to fetch data");
        }
    }
);

export const dashboardReducer = createSlice({
    name: "dashboard",
    initialState: {
        recentOrders: [],
        errorMessage: "",
        successMessage: "",
        totalOrder: 0,
        pendingOrder: 0,
        cancelledOrder: 0,
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_dashboard_index_data.fulfilled, (state, { payload }) => {
                state.totalOrder = payload.totalOrder;
                state.pendingOrder = payload.pendingOrder;
                state.cancelledOrder = payload.cancelledOrder;
                state.recentOrders = payload.recentOrders;
            })
            .addCase(get_dashboard_index_data.rejected, (state, { payload }) => {
                state.errorMessage = payload;
            });
    },
});

export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;
