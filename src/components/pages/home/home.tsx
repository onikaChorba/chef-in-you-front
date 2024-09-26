import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, fetchTags } from "../../../redux/slices/recipes.ts";
import { AppDispatch, RootState } from "../../../redux/store.ts";

export const Home = () => {

  const dispatch: AppDispatch = useDispatch();
  const { recipes, tags } = useSelector((state: RootState) => state.recipes);
  console.log(recipes, "resipes");
  console.log(tags.items, "tags");

  useEffect(() => {
    dispatch(fetchRecipes());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.items.map((recipe: any, index: number) => (
          <li key={index}>{recipe._id}</li>
        ))}
      </ul>

      <h2>Tags</h2>
      <ul>
        {tags.items.tags.map((tag: string, index: number) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </div>
  )
}