import React, { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { fetchRecipes, fetchTags } from "./redux/slices/recipes";
import { Header } from './components/header/header';
import { Home } from './components/pages/home/home';
import { Registration } from './components/form/registration/registration';
import { Login } from './components/form/login/login';
import { RecipeDetails } from './components/recipe/recipeDetails/recipeDetails';
import { AddRecipe } from './components/pages/recipes/addRecipe';
import { fetchAuthMe } from './redux/slices/auth';
import { Recipes } from './components/pages/recipes/recipes';
import Footer from './components/footer/footer';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegForm, setShowRegForm] = useState(false);

  const { recipes, tags } = useSelector((state: RootState) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAuthMe())
  })

  return (
    <div className='container'>
      <Header setShowLoginForm={setShowLoginForm} setShowRegForm={setShowRegForm} />
      <Routes>
        <Route path='/' element={<Home recipes={recipes.items} />} />
        <Route path='/recipes' element={<Recipes recipes={recipes} tags={tags} />} />
        <Route path='/recipes/tags' element={<>tags</>} />
        <Route path='/recipes/:id' element={<RecipeDetails />} />
        <Route path='/add-recipe' element={<AddRecipe />} />
        <Route path='/login' element={showLoginForm && <Login setShowLoginForm={setShowLoginForm} />} />
        <Route path='/registration' element={showRegForm && <Registration setShowRegForm={setShowRegForm} />} />
        <Route path='/me' element={<>me</>} />
        <Route path='/blog' element={<>blog</>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
