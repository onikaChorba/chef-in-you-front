import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './recipe.module.scss'
import { fetchRecipes, fetchTags } from "../../../redux/slices/recipes";
import { AppDispatch, RootState } from "../../../redux/store";
import { Button } from "../../button/button";
import { RecipeCard } from "../../recipe/recipeCard/recipeCard";

export const Recipes = () => {

  const dispatch: AppDispatch = useDispatch();
  const { recipes, tags } = useSelector((state: RootState) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <div className={styles.recipes}>
      <div className={styles.recipes__title}>
        <h2 className="poppins-extrabold">Trending Recipe</h2>
        <Button text="View more" textStyle="poppins-bold" buttonStyle="button-link" />
      </div>
      <div className={styles.recipes__list}>
        {recipes.items.map((recipe: any, index: number) => (
          <RecipeCard recipe={recipe} key={index} />
        ))}
      </div>

      <h2>Tags</h2>
      <ul>
        {tags.items.tags.map((tag: string, index: number) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </div>
  )
}