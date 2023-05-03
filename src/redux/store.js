import { configureStore } from '@reduxjs/toolkit';
import { authReduser } from './slices/auth';
import { commentsReduser } from './slices/comments';
import { postsReducer } from './slices/posts';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReduser,
    comments: commentsReduser,
  },
});

export default store;
