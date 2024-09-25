import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../../redux/slices/recipes.ts";
import { AppDispatch, RootState } from "../../../redux/store.ts";

export const Home = () => {

  const dispatch: AppDispatch = useDispatch();
  const { recipes, tags } = useSelector((state: RootState) => state.recipes);
  console.log(recipes.items, 'recipes')

  useEffect(() => {
    dispatch(fetchRecipes())
  }, [dispatch]);

  return (
    <>Home</>
  )
}