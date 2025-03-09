
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// Fetch all comments
export const fetch_comments = createAsyncThunk(
  "comments/fetch_comments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/comment");
      return response.data.comments;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Post a new comment
export const post_comment = createAsyncThunk(
  "comments/post_comment",
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await api.post("/comment/post-comment", commentData);
      return response.data.comment;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Reply to a comment
export const reply_to_comment = createAsyncThunk(
  "comments/reply_to_comment",
  async (replyData, { rejectWithValue }) => {
    try {
      const response = await api.post("/comment/reply-comment", replyData);
      return { commentId: replyData.commentId, reply: response.data.reply };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch_comments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetch_comments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(fetch_comments.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch comments";
        state.loading = false;
      })
      .addCase(post_comment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      })
      .addCase(post_comment.rejected, (state, action) => {
        state.error = action.payload || "Failed to post comment";
      })
      .addCase(reply_to_comment.fulfilled, (state, action) => {
        const { commentId, reply } = action.payload;
        const parentComment = state.comments.find((c) => c._id === commentId);
        if (parentComment) {
          parentComment.replies = parentComment.replies || [];
          parentComment.replies.push(reply);
        }
      })
      .addCase(reply_to_comment.rejected, (state, action) => {
        state.error = action.payload || "Failed to reply to comment";
      });
  },
});

export default commentsSlice.reducer;