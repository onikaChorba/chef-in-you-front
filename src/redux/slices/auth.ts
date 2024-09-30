import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.ts";
import { RootState } from "../store";

interface LoginParams {
  email: string;
  password: string;
}

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params: LoginParams) => {
  const { data } = await axios.post('/login', params);
  return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/me');
  return data;
});


const initialState = {
  isAuth: false,
  data: null,
  status: 'loading'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.isAuth = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isAuth = true;
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      })

      .addCase(fetchAuthMe.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.isAuth = true;
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      })
  }
})
export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;