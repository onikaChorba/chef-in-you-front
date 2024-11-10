import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from './recipeCard.module.scss';
import { TRecipe } from "../../../types/index";
import axios from '../../../axios';
import { Button } from "../../button/button";

export const RecipeCard = ({ recipe }: any) => {
  // const [data, setData] = useState<TRecipe | null>(null);
  // const userData = useSelector((state: any) => state.auth.data);
  // const { id } = useParams();

  // useEffect(() => {
  //   if (id) {
  //     axios.get(`/recipes/${id}`)
  //       .then(res => {
  //         setData(res.data);
  //       })
  //       .catch(error => {
  //         console.warn(error);
  //         alert('Can not to get recipe');
  //       });
  //   }
  // }, [id]);
  // console.log(data && data.user, userData?._id)
  return (
    <div className={styles.recipeCard}>
      {/* <button
          className={styles.recipeCard__saveButton}
        // onClick={() => handleSaveRecipe(recipe._id)}
        >
          Save to Favorites
        </button> */}
      <div className={styles.recipeCard__image}>
        <img src={recipe.imageUrl} alt={recipe.name} />
      </div>
      <div className={styles.recipeCard__info}>
        <h3 className={styles.recipeCard__title}>{recipe.title}</h3>
        <div>
          user:
        </div>
        <p>{recipe.viewsCount}</p>
        <Link to={`/recipes/${recipe._id}`} className={styles.recipeCard__link}>
          <Button textStyle="poppins-bold" buttonStyle="button-link" text="View Recipe" />
        </Link>

      </div>
    </div>
  );
}
