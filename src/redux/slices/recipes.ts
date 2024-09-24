import { createSlice } from "@reduxjs/toolkit";

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
});

export const recipesReducer = recipesSlice.reducer;
