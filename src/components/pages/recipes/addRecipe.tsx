import React from "react"
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../../redux/slices/auth.ts";
import { Button } from "../../button/button.tsx";
import AddRecipesImg from '../../../assets/imgs/addRecipes.jpg';
import { Input } from "../../input/input.tsx";
export const AddRecipe = () => {
  const isAuth = useSelector(selectIsAuth);

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
          <Button text="Create New Recipe" className="button-primary poppins-bold" onClick={() => console.log('create')} />
        </div>
      </div>

      <div>
        <Input name="recipe-title" label="Recipe title:" placeholder="Enter your recipe title" type="text" />
        <Input name="recipe-description" label="Description:" placeholder="Introduce your recipe" type="text" />
        <Input name="recipe-ingredients" label="Ingredients:" placeholder="Add ingredients" type="text" />
        <button> + ingredient </button>
      </div>
    </>
  )
}