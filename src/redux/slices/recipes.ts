import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
import { TRecipe } from "../../types";

interface RecipesState {
  recipes: {
    items: TRecipe[];
    status: "loading" | "succeeded" | "failed";
  };
  tags: {
    items: {
      tags: []
    };
    status: "loading" | "succeeded" | "failed";
  };
}

interface AddRecipeParams {
  recipeData: TRecipe;
  token: string;
}

const initialState: RecipesState = {
  recipes: {
    items: [],
    status: "loading",
  },
  tags: {
    items: { tags: [] },
    status: "succeeded",
  },
};

export const fetchRecipes = createAsyncThunk<TRecipe[]>('recipes/fetchRecipes', async () => {
  const { data } = await axios.get('/api/recipes');
  return data;
});

export const fetchTags = createAsyncThunk('recipes/fetchTags', async () => {
  const { data } = await axios.get('/api/recipes/tags');
  return data;
});

export const addRecipe = createAsyncThunk(
  'recipes/addRecipe',
  async ({ recipeData, token }: AddRecipeParams, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/recipes', recipeData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchDeleteRecipe = createAsyncThunk(
  'recipes/fetchDeleteRecipe',
  async (recipeId: string) => {
    try {
      await axios.delete(`/api/recipes/${recipeId}`);
      return recipeId;
    } catch (error) {
      console.error(error)
    }
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //get all recipes
      .addCase(fetchRecipes.pending, (state) => {
        state.recipes.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<TRecipe[]>) => {
        state.recipes.status = 'succeeded';
        state.recipes.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.recipes.status = 'failed';
      })
      //get tags
      .addCase(fetchTags.pending, (state) => {
        state.tags.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = 'succeeded';
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.status = 'failed';
      })
      //add new recipe
      .addCase(addRecipe.pending, (state) => {
        state.recipes.status = 'loading';
      })
      .addCase(addRecipe.fulfilled, (state, action: PayloadAction<TRecipe>) => {
        state.recipes.status = 'succeeded';
        state.recipes.items.push(action.payload);
      })
      .addCase(addRecipe.rejected, (state) => {
        state.recipes.status = 'failed';
      })
      //delete recipe
      .addCase(fetchDeleteRecipe.fulfilled, (state, action) => {
        state.recipes.items = state.recipes.items.filter(recipe => recipe._id !== action.payload);
      })
      .addCase(fetchDeleteRecipe.rejected, (state) => {
        console.error("Failed to delete recipe");
      });
  },
});

export const recipesReducer = recipesSlice.reducer;
