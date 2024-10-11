import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, fetchTags } from "../../../redux/slices/recipes";
import { AppDispatch, RootState } from "../../../redux/store";

export const Home = () => {

  const dispatch: AppDispatch = useDispatch();
  const { recipes, tags } = useSelector((state: RootState) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.items.map((recipe: any, index: number) => (
          <li key={index}>{recipe._id}
            <Link to={`/recipes/${recipe._id}`} >Link</Link>
          </li>
        ))}
      </ul>

      <h2>Tags</h2>
      <ul>
        {tags.items.tags.map((tag: string, index: number) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </div>
  )
}