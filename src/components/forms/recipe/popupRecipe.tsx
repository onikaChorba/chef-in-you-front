import React from 'react';
import styles from './popupRecipe.module.scss';
import { Input } from '../../input/input';
import { Button } from '../../button/button';
import { Popup } from '../../popup/popup';

interface IPopupRecipe {
  isPopupAddRecipeOpen: boolean;
  closePopupAddRecipe: () => void;
  recipeTitle: string;
  setRecipeTitle: (value: string) => void;
  recipeDescription: string;
  setRecipeDescription: (value: string) => void;
  ingredients: { value: string }[];
  setIngredients: (value: { value: string }[]) => void;
  handleChangeIngredient: (e: any, index: number) => void;
  addNewIngridientInput: () => void;
  removeIngredient: (index: number) => void;
  instructions: { value: string }[];
  setInstructions: (value: { value: string }[]) => void;
  handleChangeInstruction: (e: any, index: number) => void;
  addNewInstructionInput: () => void;
  removeInstruction: (index: number) => void;
  recipeServings: string;
  setRecipeServings: (value: string) => void;
  recipeTime: string;
  setRecipeTime: (value: string) => void;
  recipeTags: string;
  setRecipeTags: (value: string) => void;
  handleSubmit: () => void;
}

export const PopupRecipe = ({
  isPopupAddRecipeOpen,
  closePopupAddRecipe,
  recipeTitle,
  setRecipeTitle,
  recipeDescription,
  setRecipeDescription,
  ingredients,
  handleChangeIngredient,
  removeIngredient,
  addNewIngridientInput,
  instructions,
  handleChangeInstruction,
  removeInstruction,
  addNewInstructionInput,
  recipeServings,
  setRecipeServings,
  recipeTime,
  setRecipeTime,
  recipeTags,
  setRecipeTags,
  handleSubmit
}: IPopupRecipe) => {

  return (
    <Popup
      isOpen={isPopupAddRecipeOpen}
      onClose={closePopupAddRecipe}
      title="Lets create and share your favourite recipe"
      size="large">

      <div className={styles['popup-recipe']}>
        <Input
          value={recipeTitle}
          onChange={(e) => setRecipeTitle(e.target.value)}
          name="recipe-title"
          id="recipe-title"
          label="Recipe title:"
          placeholder="Enter your recipe title"
          type="text"
        />
        <Input
          value={recipeDescription}
          onChange={(e) => setRecipeDescription(e.target.value)}
          name="recipe-description"
          id="recipe-description"
          label="Description:"
          placeholder="Introduce your recipe"
          type="text"
        />

        <div className={styles['popup-recipe__ingredients']}>
          <p className={styles['popup-recipe__ingredients-title']}>Ingredients:</p>
          {ingredients.map((ingredient: any, index: number) => (
            <div key={index} className={styles['popup-recipe__ingredient']}>
              <div className={styles['popup-recipe__input-container']}>
                <Input
                  id={`ingredient-${index}`}
                  type="text"
                  name={`ingredient-${index}`}
                  placeholder="Add ingredient"
                  value={ingredient.value || ""}
                  onChange={(e) => handleChangeIngredient(e, index)}
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className={styles['popup-recipe__remove-button']}>
                  x
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addNewIngridientInput}
            className={styles['popup-recipe__add-button']}>
            Add Another Ingredient
          </button>
        </div>

        <div className={styles['popup-recipe__instructions']}>
          <p className={styles['popup-recipe__instructions-title']}>Instructions:</p>
          {instructions.map((instruction: any, index: number) => (
            <div key={index} className={styles['popup-recipe__instruction']}>
              <label htmlFor={`instruction-${index}`} className={styles['popup-recipe__instruction-label']}>
                Step {index + 1}:
              </label>
              <div className={styles['popup-recipe__input-container']}>
                <Input
                  type="text"
                  id={`instruction-${index}`}
                  name={`instruction-${index}`}
                  placeholder="Write instruction"
                  value={instruction.value || ""}
                  onChange={(e) => handleChangeInstruction(e, index)}
                />
                <button type="button" onClick={() => removeInstruction(index)} className={styles['popup-recipe__remove-button']}>
                  x
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addNewInstructionInput}
            className={styles['popup-recipe__add-button']}>
            Add Another Step
          </button>
        </div>

        <Input
          value={recipeServings}
          onChange={(e) => setRecipeServings(e.target.value)}
          name="recipe-servings"
          id="recipe-servings"
          label="Servings:"
          placeholder="How many portions does this recipe make?"
          type="number"
        />
        <Input
          value={recipeTime}
          onChange={(e) => setRecipeTime(e.target.value)}
          name="recipe-time"
          id="recipe-time"
          label="Cooking time:"
          placeholder="How long does it take to prepare this recipe?"
          type="number"
        />
        <Input
          value={recipeTags}
          onChange={(e) => setRecipeTags(e.target.value)}
          name="recipe-tag"
          id="recipe-tag"
          label="Tags"
          placeholder="Tags"
          type="text"
        />

        <Button
          text="Create New Recipe"
          textStyle="poppins-bold"
          onClick={handleSubmit} />
      </div>
    </Popup>
  );
};
