import React from "react";
import { Link } from "react-router-dom";
import styles from './recipeCard.module.scss';
import { Button } from "../../button/button";
import Images from "../../../images";
import { TRecipe } from "../../../types";

interface RecipeCardProps {
  recipe: TRecipe;
}
export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {

  const user = typeof recipe.user === "object" ? recipe.user : null;

  return (
    <div className={styles.recipeCard}>
      <button
        className={styles['recipeCard__save-button']}
      // onClick={() => handleSaveRecipe(recipe._id)}
      >
        <img src={Images.save.default} alt="save" width={40} />
      </button>
      <div className={styles.recipeCard__image}>
        <img src={recipe.imageUrl} alt="recipe " />
      </div>
      <div className={styles.recipeCard__info}>
        <h3 className={styles.recipeCard__title}>{recipe.title}</h3>
        <div className={styles.recipeCard__meta} >
          <div className={styles.recipeCard__user} >
            <div className={styles['recipeCard__user-avatar']}>
              <img src={Images.user.default} alt="user" width={20} />
            </div>
            {user ? user.fullName : "Unknown User"}
          </div>
          <div className={styles.recipeCard__views} >
            {recipe.viewsCount ? recipe.viewsCount.toString() : "0"}{" "} <img src={Images.view.default} alt="view" width={25} />
          </div>
        </div>
        <Link to={`/recipes/${recipe._id}`} className={styles.recipeCard__link}>
          <Button textStyle="poppins-bold" buttonStyle="button-link" text="View Recipe" />
        </Link>
      </div>
    </div>
  );
}
