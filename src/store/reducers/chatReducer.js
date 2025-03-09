// import {
//     createSlice,
//     createAsyncThunk
// } from '@reduxjs/toolkit'
// import api from '../../api/api'

// export const add_friend = createAsyncThunk(
//     'chat/add_friend',
//     async (info, { fulfillWithValue, rejectWithValue }) => {
//         try {
//             const {
//                 data
//             } = await api.post('/chat/customer/add-customer-friend', info)
//             console.log(data)
//             return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

// export const send_message = createAsyncThunk(
//     'chat/send_message',
//     async (info, { fulfillWithValue, rejectWithValue }) => {
//         try {
//             const {
//                 data
//             } = await api.post('/chat/customer/send-message-to-seller', info)
//             console.log(data)
//             return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

// export const chatReducer = createSlice({
//     name: 'chat',
//     initialState: {
//         my_friends: [],
//         fd_messages: [],
//         currentFd: "",
//         successMessage: "",
//         errorMessage : ""
//     },
//     reducers: {
//         messageClear: (state, _) => {
//             state.errorMessage = ''
//             state.successMessage = ''
//         },
//         updateMessage: (state, { payload }) => {
//             state.fd_messages = [...state.fd_messages, payload]
//         }
//     },
//     extraReducers: {
//         [add_friend.fulfilled]: (state, { payload }) => {
//             state.fd_messages = payload.messages
//             state.currentFd = payload.currentFd
//             state.my_friends = payload.myFriends
//         },
//         [send_message.fulfilled]: (state, { payload }) => {
//             let tempFriends = state.my_friends
//             let index = tempFriends.findIndex(f => f.fdId === payload.message.receverId)
//             while (index > 0) {
//                 let temp = tempFriends[index]
//                 tempFriends[index] = tempFriends[index - 1]
//                 tempFriends[index - 1] = temp
//                 index--
//             }
//             state.my_friends = tempFriends
//             state.fd_messages = [...state.fd_messages, payload.message]
//             state.successMessage = ' message send success'
//         }
//     }
// })

// export const {
//     messageClear,
//     updateMessage
// } = chatReducer.actions
// export default chatReducer.reducer

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_friend = createAsyncThunk(
    "chat/add_friend",
    async (info, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/chat/customer/add-customer-friend", info);
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Failed to add friend");
        }
    }
);

export const send_message = createAsyncThunk(
    "chat/send_message",
    async (info, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/chat/customer/send-message-to-seller", info);
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Failed to send message");
        }
    }
);

export const chatReducer = createSlice({
    name: "chat",
    initialState: {
        my_friends: [],
        fd_messages: [],
        currentFd: "",
        successMessage: "",
        errorMessage: "",
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
        updateMessage: (state, { payload }) => {
            state.fd_messages.push(payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_friend.fulfilled, (state, { payload }) => {
                state.fd_messages = payload.messages;
                state.currentFd = payload.currentFd;
                state.my_friends = payload.myFriends;
            })
            .addCase(send_message.fulfilled, (state, { payload }) => {
                const index = state.my_friends.findIndex(
                    (f) => f.fdId === payload.message.receverId
                );

                if (index > 0) {
                    const [friend] = state.my_friends.splice(index, 1);
                    state.my_friends.unshift(friend);
                }

                state.fd_messages.push(payload.message);
                state.successMessage = "Message sent successfully";
            })
            .addCase(add_friend.rejected, (state, { payload }) => {
                state.errorMessage = payload;
            })
            .addCase(send_message.rejected, (state, { payload }) => {
                state.errorMessage = payload;
            });
    },
});

export const { messageClear, updateMessage } = chatReducer.actions;
export default chatReducer.reducer;
