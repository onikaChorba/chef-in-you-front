import React, { useState } from "react"
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../../redux/slices/auth.ts";
import { Button } from "../../button/button.tsx";
import AddRecipesImg from '../../../assets/imgs/addRecipes.jpg';
import { Input } from "../../input/input.tsx";
export const AddRecipe = () => {
  const isAuth = useSelector(selectIsAuth);

  const [ingredients, setIngredients] = useState([{ value: "" }]);
  const [instructions, setInstructions] = useState([{ value: "" }]);
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
  if (!isAuth) {
    return <Navigate to="/" />
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ width: '50%' }}><img src={AddRecipesImg} alt="AddRecipesImg" style={{ width: '100%' }} /></div>
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 className="poppins-bold">Share Your <span>Recipes</span></h2>
          <p className="poppins-regular">
            Create and share your favorite recipes with others! Add your unique recipe to inspire cooks from all over the world.
          </p>
        </div>
      </div>

      <div>
        <Input name="recipe-title" label="Recipe title:" placeholder="Enter your recipe title" type="text" />
        <Input name="recipe-description" label="Description:" placeholder="Introduce your recipe" type="text" />
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
                <input
                  type="text"
                  id={`ingredient-${index}`}
                  name={`ingredient-${index}`}
                  placeholder="Add ingredient"
                  value={ingredient.value}
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
          {instructions.map((ingredient, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ width: '100%' }} className="input-container">
                <label htmlFor={`ingredient-${index}`}>Step {index + 1}:</label>
                <input
                  type="text"
                  id={`ingredient-${index}`}
                  name={`ingredient-${index}`}
                  placeholder="Write instruction"
                  value={ingredient.value}
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
        <Input name="recipe-servings" label="Servings:" placeholder="How many portions does this recipe make?" type="number" />
        <Input name="recipe-time" label="Cooking time:" placeholder="How long does it take to prepate this recipe?" type="number" />
        <Input name="recipe-tag" label="Tags" placeholder="Tags" type="text" />

        <Button text="Create New Recipe" className="button-primary poppins-bold" onClick={() => console.log('create')} />
      </div>
    </>
  )
}