import React, { useState } from "react"
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from './recipe.module.scss';
import { selectIsAuth } from "../../../redux/slices/auth.ts";
import { Input } from "../../input/input.tsx";
import { Button } from "../../button/button.tsx";
import AddRecipesImg from '../../../assets/imgs/addRecipes.jpg';
import water from '../../../assets/icons/water.png';
import cooking from '../../../assets/icons/cooking.png';
import bake from '../../../assets/icons/bake.png';

export const AddRecipe = () => {

  const isAuth = useSelector(selectIsAuth);

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

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleChangeIngredient = (e, index) => {
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

  const removeInstruction = (index) => {
    const newIngredients = instructions.filter((_, i) => i !== index);
    setInstructions(newIngredients);
  };

  const handleChangeInstruction = (e, index) => {
    const newIngredients = [...instructions];
    newIngredients[index].value = e.target.value;

    if (e.target.value && index === instructions.length - 1) {
      addNewInstructionInput();
    }

    setInstructions(newIngredients);
  };

  const handleSubmit = () => {
    const recipeData = {
      title: recipeTitle,
      description: recipeDescription,
      servings: recipeServings,
      time: recipeTime,
      tags: recipeTags,
      ingredients: ingredients.map(item => item.value),
      instructions: instructions.map(item => item.value),
    };

    console.log('Recipe data:', recipeData);
  };

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />
  };

  return (
    <>
      <div className={styles["add-recipe-container"]}>
        <div className={styles["image-container"]}>
          <img src={AddRecipesImg} alt="AddRecipesImg" className={styles["recipe-image"]} />
        </div>
        <div className={styles["text-container"]}>
          <h2 className={styles["poppins-bold"]}>
            Share Your <span>Recipes</span>
          </h2>
          <p className={styles["poppins-regular"]}>
            Create and share your favorite recipes with others! Add your unique recipe to inspire cooks from all over the world.
          </p>

          <div className={styles["icon-container"]}>
            <img src={water} alt="Icon 1" className={styles["icon"]} />
            <img src={cooking} alt="Icon 2" className={styles["icon"]} />
            <img src={bake} alt="Icon 3" className={styles["icon"]} />
          </div>

          <Button className="button-primary" text="Add Your Recipe" textStyle="poppins-semibold" />

          <div className={styles["testimonial"]}>
            <p>“This platform helped me find amazing recipes and share my own!” - Jane D.</p>
          </div>
        </div>

      </div>

      <div>
        <Input value={recipeTitle} onChange={(e) => setRecipeTitle(e.target.value)} name="recipe-title" label="Recipe title:" placeholder="Enter your recipe title" type="text" />
        <Input value={recipeDescription} onChange={(e) => setRecipeDescription(e.target.value)} name="recipe-description" label="Description:" placeholder="Introduce your recipe" type="text" />
        <div>
          <p style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#b55d51",
            marginBottom: "8px"
          }}> Ingredients:
          </p>

          {ingredients.map((ingredient, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ width: '100%' }} className="input-container">
                <Input
                  type="text"
                  name={`ingredient-${index}`}
                  placeholder="Add ingredient"
                  value={ingredient.value || ""}
                  onChange={(e) => handleChangeIngredient(e, index)}
                />
              </div>
              <div>
                <button type="button" onClick={() => removeIngredient(index)}>
                  x
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={addNewIngridientInput}>
            Add Another Ingredient
          </button>

          <p style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#b55d51",
            marginBottom: "8px"
          }}> Instructions:
          </p>
          {instructions.map((instruction, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ width: '100%' }} className="input-container">
                <label htmlFor={`instruction-${index}`}>Step {index + 1}:</label>
                <Input
                  type="text"
                  name={`instruction-${index}`}
                  placeholder="Write instruction"
                  value={instruction.value || ""}
                  onChange={(e) => handleChangeInstruction(e, index)}
                />
              </div>
              <div>
                <button type="button" onClick={() => removeInstruction(index)}>
                  x
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={addNewInstructionInput}>
            Add Another Step
          </button>
        </div>
        <Input value={recipeServings} onChange={(e) => setRecipeServings(e.target.value)} name="recipe-servings" label="Servings:" placeholder="How many portions does this recipe make?" type="number" />
        <Input value={recipeTime} onChange={(e) => setRecipeTime(e.target.value)} name="recipe-time" label="Cooking time:" placeholder="How long does it take to prepate this recipe?" type="number" />
        <Input value={recipeTags}
          onChange={(e) => setRecipeTags(e.target.value)} name="recipe-tag" label="Tags" placeholder="Tags" type="text" />

        <Button text="Create New Recipe" textStyle="poppins-bold" className="button-primary" onClick={handleSubmit} />
      </div>
    </>
  )
}