import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios';

export const fetchComments = createAsyncThunk('commets/getAll', async () => {
  const { data } = await axios.get('/comments');
  return data;
});
export const fetchCommentsByPost = createAsyncThunk('comments/ById', async (id) => {
  const { data } = await axios.get(`/comments/post/${id}`);
  return data;
});
export const addCommentsPostById = createAsyncThunk('add/comments', async (params) => {
  const { data } = await axios.post('/comment', params);
  return data;
});

const initialState = {
  comments: {
    items: [],
    status: 'loading',
  },
  commentByPost: {
    items: [],
    status: 'loading',
  },
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchComments.pending]: (state, action) => {
      state.comments.items = [];
      state.comments.status = 'loading';
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'loaded';
    },
    [fetchComments.rejected]: (state, action) => {
      state.comments.items = [];
      state.comments.status = 'error';
    },
    // __________________________________________//
    [fetchCommentsByPost.pending]: (state, action) => {
      state.commentByPost.items = [];
      state.commentByPost.status = 'loading';
    },
    [fetchCommentsByPost.fulfilled]: (state, action) => {
      state.commentByPost.items = action.payload;
      state.commentByPost.status = 'loaded';
    },
    [fetchCommentsByPost.rejected]: (state, action) => {
      state.commentByPost.items = [];
      state.commentByPost.status = 'error';
    },
    //--------------------------------------------------------//
    [addCommentsPostById.pending]: (state, action) => {
      state.commentByPost.status = 'loading';
    },
    [addCommentsPostById.fulfilled]: (state, action) => {
      state.commentByPost.items.push(action.payload);
      state.commentByPost.status = 'loaded';
    },
    [addCommentsPostById.rejected]: (state, action) => {
      state.commentByPost.status = 'error';
    },
  },
});
export const commentsReduser = commentsSlice.reducer;
