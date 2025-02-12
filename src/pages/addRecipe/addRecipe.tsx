import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import styles from './addRecipe.module.scss';
import { selectIsAuth } from "../../redux/slices/auth";
import { Button } from "../../components/button/button";
import { addRecipe } from "../../redux/slices/recipes";
import Images from "../../images";
import { PopupRecipe } from "../../components/form/recipe/popupRecipe";
interface RecipeData {
  title: string;
  description: string;
  servings: number;
  time: string;
  tags: string;
  ingredients: string[];
  instructions: string[];
  user: string | null | string;
}
interface IAddRecipe {
  setShowRegForm: (showRegFrom: boolean) => void;
}

export const AddRecipe = ({ setShowRegForm }: IAddRecipe) => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch<AppDispatch>();
  const [isPopupAddRecipeOpen, setIsPopupAddRecipeOpen] = useState(false);

  const openPopupAddRecipe = () => {
    setIsPopupAddRecipeOpen(true);
  };

  const closePopupAddRecipe = () => {
    setIsPopupAddRecipeOpen(false);
  };

  const [ingredients, setIngredients] = useState([{ value: "" }]);
  const [instructions, setInstructions] = useState([{ value: "" }]);

  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeServings, setRecipeServings] = useState("");
  const [recipeTime, setRecipeTime] = useState("");
  const [recipeTags, setRecipeTags] = useState("");


  const addNewIngridientInput = () => {
    setIngredients([...ingredients, { value: "" }]);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleChangeIngredient = (e: any, index: number) => {
    const newIngredients = [...ingredients];
    newIngredients[index].value = e.target.value;

    if (e.target.value && index === ingredients.length - 1) {
      addNewIngridientInput();
    }

    setIngredients(newIngredients);
  };
  const addNewInstructionInput = () => {
    setInstructions([...instructions, { value: "" }]);
  };

  const removeInstruction = (index: number) => {
    const newIngredients = instructions.filter((_, i) => i !== index);
    setInstructions(newIngredients);
  };

  const handleChangeInstruction = (e: any, index: number) => {
    const newIngredients = [...instructions];
    newIngredients[index].value = e.target.value;

    if (e.target.value && index === instructions.length - 1) {
      addNewInstructionInput();
    }

    setInstructions(newIngredients);
  };

  const getPayloadFromToken = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      console.error('Invalid token format', error);
      return null;
    }
  };

  const payload = getPayloadFromToken();
  const userId = payload ? payload._id : null;

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authorization token not found');
      return;
    }

    const recipeData: RecipeData = {
      title: recipeTitle,
      description: recipeDescription,
      servings: Number(recipeServings),
      time: recipeTime,
      tags: recipeTags,
      ingredients: ingredients.map(item => item.value),
      instructions: instructions.map(item => item.value),
      user: userId,
    };

    await dispatch(addRecipe({ recipeData, token }));
    console.log('Recipe data:', recipeData);
  };

  const unsigned = !window.localStorage.getItem("token") && !isAuth

  const recipeProps = {
    isPopupAddRecipeOpen,
    closePopupAddRecipe,
    recipeTitle,
    setRecipeTitle,
    recipeDescription,
    setRecipeDescription,
    recipeServings,
    setRecipeServings,
    recipeTime,
    setRecipeTime,
    recipeTags,
    setRecipeTags,
    ingredients,
    setIngredients,
    instructions,
    setInstructions,
    handleSubmit,
    handleChangeIngredient,
    removeIngredient,
    addNewIngridientInput,
    handleChangeInstruction,
    addNewInstructionInput,
    removeInstruction
  };

  return (
    <div>
      <div className={styles['add-recipe']}>
        <div className={styles['add-recipe__image-container']}>
          <img src={Images.addRecipes} alt="AddRecipesImg" className={styles['add-recipe__image']} />
        </div>
        <div className={styles['add-recipe__text-container']}>
          <h2 className={styles['add-recipe__title']}>
            Share Your <span>Recipes</span>
          </h2>
          <p className={styles['add-recipe__description']}>
            Create and share your favorite recipes with others! Add your unique recipe to inspire cooks from all over the world.
          </p>

          <div className={styles['add-recipe__icon-container']}>
            <img src={Images.water} alt="Icon 1" className={styles['add-recipe__icon']} />
            <img src={Images.cooking} alt="Icon 2" className={styles['add-recipe__icon']} />
            <img src={Images.bake} alt="Icon 3" className={styles['add-recipe__icon']} />
          </div>
          {
            unsigned ? <Button text="Sign up for creating recipes" textStyle="poppins-semibold" onClick={() => setShowRegForm && setShowRegForm(true)} /> : <Button text="Add Your Recipe" textStyle="poppins-semibold" onClick={openPopupAddRecipe} />
          }
          <div className={styles['add-recipe__testimonial']}>
            <p>“This platform helped me find amazing recipes and share my own!” - Jane D.</p>
          </div>
        </div>
      </div>
      {isPopupAddRecipeOpen && (
        <PopupRecipe {...recipeProps} />
      )}
    </div>

  )
}