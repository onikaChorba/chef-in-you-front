import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './recipes.module.scss'
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
      <div className={styles.recipes__content}>
        <div className={styles['recipes__tags-container']}>
          <p className={`${styles['recipes__tags-header']} poppins-bold-italic`}>#Search by Taste Tags</p>
          <ul className={styles.recipes__tags}>
            {tags.items.tags.map((tag: string, index: number) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
        <div className={styles.recipes__list}>
          {recipes.items.map((recipe: any, index: number) => (
            <RecipeCard recipe={recipe} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}