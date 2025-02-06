import React from "react";
import { Link } from "react-router-dom";
import styles from './recipeCard.module.scss';
import { Button } from "../../button/button";
import Images from "../../../images";

export const RecipeCard = ({ recipe }: any) => {
  return (
    <div className={styles.recipeCard}>
      <button
        className={styles.recipeCard__saveButton}
      // onClick={() => handleSaveRecipe(recipe._id)}
      >
        <img src={Images.save.default} alt="save" width={40} />
      </button>
      <div className={styles.recipeCard__image}>
        <img src={recipe.imageUrl} alt={recipe.name} />
      </div>
      <div className={styles.recipeCard__info}>
        <h3 className={styles.recipeCard__title}>{recipe.title}</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', color: '#555' }}>
            <div style={{
              width: '30px', height: '30px',
              background: '#f0f0f0', display: 'flex',
              justifyContent: 'center', alignItems: 'center', borderRadius: '15px'
            }}>
              <img src={Images.user.default} alt="user" width={20} />
            </div>
            {recipe?.user?.fullName}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '5px', color: '#999999' }}>
            {recipe.viewsCount} <img src={Images.view.default} alt="view" width={25} /></div>
        </div>
        <Link to={`/recipes/${recipe._id}`} className={styles.recipeCard__link}>
          <Button textStyle="poppins-bold" buttonStyle="button-link" text="View Recipe" />
        </Link>
      </div>
    </div>
  );
}
