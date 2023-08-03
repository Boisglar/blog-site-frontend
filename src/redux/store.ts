import { configureStore } from '@reduxjs/toolkit';
import { authReduser } from './slices/auth';
import { commentsReduser } from './slices/comments';
import { postsReducer } from './slices/posts';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReduser,
    comments: commentsReduser,
  },
});



export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store;
