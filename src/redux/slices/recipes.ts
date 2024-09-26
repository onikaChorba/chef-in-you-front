import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.ts";

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const { data } = await axios.get('/recipes');
  return data;
});

export const fetchTags = createAsyncThunk('recipes/fetchTags', async () => {
  const { data } = await axios.get('/recipes/tags');
  return data;
});

const initialState = {
  recipes: {
    items: [],
    status: "loading",
  },
  tags: {
    items: { tags: [] },
    status: "succeeded",
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
      })
      .addCase(fetchTags.pending, (state) => {
        state.tags.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = 'succeeded';
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.status = 'failed';
      });
  },
});

export const recipesReducer = recipesSlice.reducer;
