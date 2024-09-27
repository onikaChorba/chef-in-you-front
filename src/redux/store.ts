import { configureStore } from "@reduxjs/toolkit";
import { recipesReducer } from "./slices/recipes.ts";
import { authReducer } from "./slices/auth.ts";

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    auth: authReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
