import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import axios from '../../../axios';
import { fetchDeleteRecipe } from "../../../redux/slices/recipes";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from './recipeDetails.module.scss';
import { TRecipe } from "../../../types/index";
import { Checkbox } from "../../checkbox/checkbox";
import checkbox from '../../../assets/icons/checkbox.svg'
import checkboxCheck from '../../../assets/icons/checkbox-check.svg'
import userAvatar from '../../../assets/icons/user2.svg'
import calendar from '../../../assets/icons/calendar.svg'
import views from '../../../assets/icons/view2.svg'
import save from '../../../assets/icons/save.svg'
import share from '../../../assets/icons/share.svg'
import remove from '../../../assets/icons/remove.svg'
import edit from '../../../assets/icons/edit.svg'

export const RecipeDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
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
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      await dispatch(fetchDeleteRecipe(id as string));
    }
  };
  return (
    <div className={styles.recipeDetails}>
      <h2 className={styles.recipeDetails__title}>{recipe?.title}</h2>
      <div className={styles.recipeDetails__meta}>
        {
          !!recipe?.user?.fullName && <div className={styles.recipeDetails__user}>
            <img src={userAvatar} alt="user" height={22} />
            <p>{recipe?.user?.fullName}</p>
          </div>
        }
        {
          !!recipe?.createdAt && <div className={styles.recipeDetails__date}>
            <img src={calendar} alt="calendar" height={20} />
            <p>{recipe?.createdAt && new Date(recipe.createdAt).toLocaleDateString()}
            </p>
          </div>
        }
        <div className={styles.recipeDetails__views}>
          <img src={views} alt="views" height={15} />
          <p >{String(recipe?.viewsCount)}</p></div>
        <button className={styles.recipeDetails__saveButton}>
          <img src={save} alt="save" width={30} /><p>Save</p>
        </button>
        <button className={styles.recipeDetails__shareButton}><img src={share} alt="share" height={22} />Share</button>

        {isRecipeOwner && <button onClick={handleDelete}><img src={remove} alt="share" height={25} /><p>Remove recipe</p></button>}
        {isRecipeOwner && <button><img src={edit} alt="share" height={22} /><p>Edit recipe</p></button>}
      </div>
      <hr className={styles.recipeDetails__divider} />
      <div className={styles.recipeDetails__content}>
        <div className={styles.recipeDetails__imageWrapper}>
          <img src={recipe?.imageUrl} alt={recipe?.title} className={styles.recipeDetails__image} />
        </div>
        <div className={styles.recipeDetails__info}>
          <div className={styles.recipeDetails__timeServings}>
            <p className="poppins-medium">Time: <span>{recipe?.time ? recipe?.time : '45 min'}</span></p>
            <p className="poppins-medium">Servings: <span>{recipe?.servings}</span></p>
          </div>
          <div className={styles.recipeDetails__tags}>
            <span className="poppins-bold-italic"> #tags:</span>
            {Array.isArray(recipe?.tags) ? (
              recipe?.tags.map((tag: string, index: number) => (
                <span key={index} className={`${styles.recipeDetails__tag} poppins-medium`}>{tag}</span>
              ))
            ) : (
              <span className={styles.recipeDetails__tag}>{recipe?.tags}</span>
            )}
          </div>
          <h3>Ingredients:</h3>
          <ul className={styles.recipeDetails__ingredients}>
            {recipe?.ingredients.map((ingr: string, index: number) => (
              <li key={index} className={styles.recipeDetails__ingredient}>
                <Checkbox
                  // checked={isChecked}
                  // onChange={setIsChecked}
                  checkedImage={checkboxCheck}
                  uncheckedImage={checkbox}
                  label={ingr}
                />
              </li>
            ))}
          </ul>
          <h3>Instruction:</h3>
          <ol className={styles.recipeDetails__instructions}>
            {recipe?.instructions.map((instr: string, index: number) => (
              <li key={index} className={styles.recipeDetails__instruction}>
                <Checkbox
                  // checked={isChecked}
                  // onChange={setIsChecked}
                  checkedImage={checkboxCheck}
                  uncheckedImage={checkbox}
                  label={instr}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
