import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.ts";

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const { data } = await axios.get('/recipes');
  return data;
});

const initialState = {
  recipes: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.recipes.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.recipes.status = 'succeeded';
        state.recipes.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.recipes.status = 'failed';
      });
  },
});

export const recipesReducer = recipesSlice.reducer;
