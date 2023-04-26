import { configureStore } from '@reduxjs/toolkit';
import { authReduser } from './slices/auth';
import { postsReducer } from './slices/posts';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReduser,
  },
});

export default store;
