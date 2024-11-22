import React from "react";
import styles from './recipes.module.scss'
import { Button } from "../../button/button";
import { RecipeCard } from "../../recipe/recipeCard/recipeCard";

export const Recipes = ({ recipes, tags }: any) => {

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