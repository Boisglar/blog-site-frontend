import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';
import { IUser } from '../../types';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get<IPost[]>('/posts');
  return data;
});

export const fetchTags = createAsyncThunk('tags/fetchTegs', async () => {
  const { data } = await axios.get<string[]>('/tags');
  return data;
});
export const fetchRemovePost = createAsyncThunk('post/fetchRemovePost', async (id: string) => {
  axios.delete(`/posts/${id}`);
});




export interface IPost {
  _id: string;
  title: string;
  imageUrl: string;
  user: IUser;
  createdAt: string;
  viewsCount: number;
  tags: string[];
}




interface IpostSlices {
  posts: {
    items: IPost[]
    status: 'loading' | 'loaded' | 'error'
  }
  tags: {
    items: string[]
    status: 'loading' | 'loaded' | 'error'
  }
}


const initialState: IpostSlices = {
  posts: {
    items: [],
    status: 'loading'
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.posts.items = [];
      state.posts.status = 'error';
    })

    builder.addCase(fetchTags.pending, (state, action) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    })

    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    })
    builder.addCase(fetchTags.rejected, (state, action) => {
      state.tags.items = [];
      state.tags.status = 'error';
    })
    builder.addCase(fetchRemovePost.pending, (state, action) => {
      state.posts.items = state.posts.items.filter((item) => item._id !== action.meta.arg);

    })
  },
});
export const postsReducer = postsSlice.reducer;
