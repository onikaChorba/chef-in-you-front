import { configureStore } from "@reduxjs/toolkit";
import { recipesReducer } from "./slices/recipes.ts";

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
});

export default store;
