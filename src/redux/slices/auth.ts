import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios';
import { RootState } from '../store';
import { IUser } from '../../types';
import { type } from 'os';

export const fetchAuth = createAsyncThunk<GetAuthUserData, AuthUserData>('auth/fetchUserData', async (params) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});
export const fetchRegister = createAsyncThunk<GetAuthUserData, RegisterAuth>('auth/fetchRegister', async (params) => {
  const { data } = await axios.post('/auth/register', params);
  return data;
});
export const fetchAuthMe = createAsyncThunk('auth/fetchMe', async () => {
  const { data } = await axios.get<GetAuthUserData>('/auth/me');
  return data;
});

export type AuthUserData = {
  email: string,
  password: string
}
type GetAuthUserData = IUser & {
  token: string
}

export type RegisterAuth = {
  email: string,
  password: string,
  fullName: string,
  avatarUrl?: string,
}


interface IauthSlice {
  data: {
    avatarUrl: string,
    createdAt: string,
    email: string,
    fullName: string,
    token: string,
    updatedAt: string
    _id: string
  } | null,
  status: 'loading' | "error" | "loaded",
}

const initialState: IauthSlice = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state, action) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.status = 'error';
        state.data = null;
      })
      .addCase(fetchAuthMe.pending, (state, action) => {
        state.status = 'loading';
        state.data = null;

      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state, action) => {
        state.status = 'error';
        state.data = null;
      })
      .addCase(fetchRegister.pending, (state, action) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = 'error';
        state.data = null;
      })
  },
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);

export const authReduser = authSlice.reducer;
export const { logout } = authSlice.actions;
