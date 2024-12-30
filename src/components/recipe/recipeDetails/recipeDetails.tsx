import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from './recipeDetails.module.scss';
import { TRecipe } from "../../../types/index";
import axios from '../../../axios';

export const RecipeDetails = () => {
  const [recipe, setRecipe] = useState<TRecipe | null | any>(null);
  const userData = useSelector((state: any) => state.auth.data);
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    if (id) {
      axios.get(`/api/recipes/${id}`)
        .then(res => {
          if (isMounted) {
            setRecipe(res.data);
          }
        })
        .catch(error => {
          console.warn(error);
          alert('Cannot get recipe');
        });
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const isRecipeOwner = useMemo(() => recipe?.user === userData?._id, [recipe, userData]);

  return (
    <div className={styles.recipeDetails}>
      <h2 className={styles.recipeDetails__title}>{recipe?.title}</h2>
      <div className={styles.recipeDetails__meta}>
        <span className={styles.recipeDetails__user}>{recipe?.user?.fullName}</span>
        <span className={styles.recipeDetails__date}>{recipe?.createdAt}</span>
        <span className={styles.recipeDetails__views}>Views: {String(recipe?.viewsCount)}</span>
        <button className={styles.recipeDetails__saveButton}>Save</button>
        <button className={styles.recipeDetails__shareButton}>Share</button>

        {isRecipeOwner && <button>Remove recipe</button>}
        {isRecipeOwner && <button>Edit recipe</button>}
      </div>
      <hr className={styles.recipeDetails__divider} />
      <div className={styles.recipeDetails__content}>
        <div className={styles.recipeDetails__imageWrapper}>
          <img src={recipe?.imageUrl} alt={recipe?.title} className={styles.recipeDetails__image} />
        </div>
        <div className={styles.recipeDetails__info}>
          <div className={styles.recipeDetails__timeServings}>
            <span>Time: {recipe?.time}</span>
            <span>Servings: {recipe?.servings}</span>
          </div>
          <div className={styles.recipeDetails__tags}>
            {Array.isArray(recipe?.tags) ? (
              recipe?.tags.map((tag: string, index: number) => (
                <span key={index} className={styles.recipeDetails__tag}>{tag}</span>
              ))
            ) : (
              <span className={styles.recipeDetails__tag}>{recipe?.tags}</span>
            )}
          </div>
          <h3>Ingredients:</h3>
          <ul className={styles.recipeDetails__ingredients}>
            {recipe?.ingredients.map((ingr: string, index: number) => (
              <li key={index} className={styles.recipeDetails__ingredient}>{ingr}</li>
            ))}
          </ul>
          <h3>Instruction:</h3>
          <ol className={styles.recipeDetails__instructions}>
            {recipe?.instructions.map((instr: string, index: number) => (
              <li key={index} className={styles.recipeDetails__instruction}>{instr}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
