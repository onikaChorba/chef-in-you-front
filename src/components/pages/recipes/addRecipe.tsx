import React, { useState } from "react"
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import styles from './recipes.module.scss';
import { selectIsAuth } from "../../../redux/slices/auth";
import { Input } from "../../input/input";
import { Button } from "../../button/button";
import AddRecipesImg from '../../../assets/imgs/addRecipes.jpg';
import water from '../../../assets/icons/water.png';
import cooking from '../../../assets/icons/cooking.png';
import bake from '../../../assets/icons/bake.png';
import { Popup } from "../../popup/popup";
import { addRecipe } from "../../../redux/slices/recipes";
interface RecipeData {
  title: string;
  description: string;
  servings: number;
  time: string;
  tags: string;
  ingredients: string[];
  instructions: string[];
  userId: string | null;
}
export const AddRecipe = () => {

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
      userId: userId,
    };

    await dispatch(addRecipe({ recipeData, token }));
    console.log('Recipe data:', recipeData);
  };
  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className={styles['add-recipe']}>
        <div className={styles['add-recipe__image-container']}>
          <img src={AddRecipesImg} alt="AddRecipesImg" className={styles['add-recipe__image']} />
        </div>
        <div className={styles['add-recipe__text-container']}>
          <h2 className={styles['add-recipe__title']}>
            Share Your <span>Recipes</span>
          </h2>
          <p className={styles['add-recipe__description']}>
            Create and share your favorite recipes with others! Add your unique recipe to inspire cooks from all over the world.
          </p>

          <div className={styles['add-recipe__icon-container']}>
            <img src={water} alt="Icon 1" className={styles['add-recipe__icon']} />
            <img src={cooking} alt="Icon 2" className={styles['add-recipe__icon']} />
            <img src={bake} alt="Icon 3" className={styles['add-recipe__icon']} />
          </div>

          <Button text="Add Your Recipe" textStyle="poppins-semibold" onClick={openPopupAddRecipe} />

          <div className={styles['add-recipe__testimonial']}>
            <p>“This platform helped me find amazing recipes and share my own!” - Jane D.</p>
          </div>
        </div>
      </div>

      <Popup
        isOpen={isPopupAddRecipeOpen}
        onClose={closePopupAddRecipe}
        title="Lets create and share your favourite recipe"
        size="large">
        <div className={styles['add-recipe__form-container']}>
          <Input value={recipeTitle} onChange={(e) => setRecipeTitle(e.target.value)} name="recipe-title" label="Recipe title:" placeholder="Enter your recipe title" type="text" />
          <Input value={recipeDescription} onChange={(e) => setRecipeDescription(e.target.value)} name="recipe-description" label="Description:" placeholder="Introduce your recipe" type="text" />

          <div className={styles['add-recipe__ingredients-section']}>
            <p className={styles['add-recipe__ingredients-title']}>Ingredients:</p>
            {ingredients.map((ingredient, index) => (
              <div key={index} className={styles['add-recipe__ingredient']}>
                <div className={styles['add-recipe__input-container']}>
                  <Input
                    type="text"
                    name={`ingredient-${index}`}
                    placeholder="Add ingredient"
                    value={ingredient.value || ""}
                    onChange={(e) => handleChangeIngredient(e, index)}
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className={styles['add-recipe__remove-button']}>
                    x
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addNewIngridientInput}
              className={styles['add-recipe__add-button']}>
              Add Another Ingredient
            </button>
          </div>

          <div className={styles['add-recipe__instructions-section']}>
            <p className={styles['add-recipe__instructions-title']}>Instructions:</p>
            {instructions.map((instruction, index) => (
              <div key={index} className={styles['add-recipe__instruction']}>
                <label htmlFor={`instruction-${index}`} className={styles['add-recipe__instruction-label']}>
                  Step {index + 1}:
                </label>
                <div className={styles['add-recipe__input-container']}>
                  <Input
                    type="text"
                    name={`instruction-${index}`}
                    placeholder="Write instruction"
                    value={instruction.value || ""}
                    onChange={(e) => handleChangeInstruction(e, index)}
                  />
                  <button type="button" onClick={() => removeInstruction(index)} className={styles['add-recipe__remove-button']}>
                    x
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addNewInstructionInput}
              className={styles['add-recipe__add-button']}>
              Add Another Step
            </button>
          </div>

          <Input value={recipeServings} onChange={(e) => setRecipeServings(e.target.value)} name="recipe-servings" label="Servings:" placeholder="How many portions does this recipe make?" type="number" />
          <Input value={recipeTime} onChange={(e) => setRecipeTime(e.target.value)} name="recipe-time" label="Cooking time:" placeholder="How long does it take to prepare this recipe?" type="number" />
          <Input value={recipeTags} onChange={(e) => setRecipeTags(e.target.value)} name="recipe-tag" label="Tags" placeholder="Tags" type="text" />

          <Button
            text="Create New Recipe"
            textStyle="poppins-bold" onClick={handleSubmit} />
        </div>
      </Popup>
    </div>

  )
}