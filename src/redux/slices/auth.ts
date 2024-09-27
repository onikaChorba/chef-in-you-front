import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.ts";

interface LoginParams {
  email: string;
  password: string;
}

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params: LoginParams) => {
  const { data } = await axios.post('/login', params);
  return data;
});
const initialState = {
  data: null,
  status: 'loading'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      })
  }
})

export const authReducer = authSlice.reducer;
