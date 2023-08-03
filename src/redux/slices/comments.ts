import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios';
import { Comments, IUser } from '../../types';

export const fetchComments = createAsyncThunk('commets/getAll', async () => {
  const { data } = await axios.get('/comments');
  return data;
});
export const fetchCommentsByPost = createAsyncThunk('comments/ById', async (id: string) => {
  const { data } = await axios.get<Comments[]>(`/comments/post/${id}`);
  return data;
});
export const addCommentsPostById = createAsyncThunk('add/comments', async (params: {
  user: string,
  text: string,
  postId: string,
}) => {
  const { data } = await axios.post('/comment', params);
  return data;
});

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'loaded',
  ERROR = 'error'
}


interface ICommentsSlice {
  comments: {
    items: Comments[],
    status: Status
  }
  commentByPost: {
    items: Comments[],
    status: Status
  }
}

const initialState: ICommentsSlice = {
  comments: {
    items: [],
    status: Status.LOADING,
  },
  commentByPost: {
    items: [],
    status: Status.LOADING,
  },
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.comments.items = [];
        state.comments.status = Status.LOADING;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments.items = action.payload;
        state.comments.status = Status.SUCCESS;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.comments.items = [];
        state.comments.status = Status.ERROR;
      })
      .addCase(fetchCommentsByPost.pending, (state, action) => {
        state.commentByPost.items = [];
        state.commentByPost.status = Status.LOADING;
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        state.commentByPost.items = action.payload;
        state.commentByPost.status = Status.SUCCESS;
      })
      .addCase(fetchCommentsByPost.rejected, (state, action) => {
        state.commentByPost.items = [];
        state.commentByPost.status = Status.ERROR;
      })
      .addCase(addCommentsPostById.pending, (state, action) => {
        state.commentByPost.status = Status.LOADING;
      })
      .addCase(addCommentsPostById.fulfilled, (state, action) => {
        state.commentByPost.items.push(action.payload);
        state.commentByPost.status = Status.SUCCESS;
      })
      .addCase(addCommentsPostById.rejected, (state, action) => {
        state.commentByPost.status = Status.ERROR;
      })
  },
});
export const commentsReduser = commentsSlice.reducer;
