import React, { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { fetchRecipes, fetchTags } from "./redux/slices/recipes";
import { Header } from './components/header/header';
import { Home } from './pages/home/home';
import { Registration } from './components/form/registration/registration';
import { Login } from './components/form/login/login';
import { RecipeDetails } from './components/recipe/recipeDetails/recipeDetails';
import { AddRecipe } from './pages/addRecipe/addRecipe';
import { fetchAuthMe } from './redux/slices/auth';
import { Recipes } from './pages/recipes/recipes';
import { Blog } from './pages/blog/blog'
import Footer from './components/footer/footer';
import { Subscribe } from './components/form/subscribe/subscribe';

function App() {
  const dispatch: AppDispatch = useDispatch();

  const { recipes, tags } = useSelector((state: RootState) => state.recipes);
  const [showSubscribeForm, setShowSubscribeForm] = useState(false);

  useEffect(() => {
    dispatch(fetchRecipes());
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAuthMe())
  })

  return (
    <div className='container'>
      <Header />
      <Routes>
        <Route path='/' element={<Home recipes={recipes.items} />} />
        <Route path='/recipes' element={<Recipes recipes={recipes} tags={tags} />} />
        <Route path='/recipes/tags' element={<>tags</>} />
        <Route path='/recipes/:id' element={<RecipeDetails />} />
        <Route path='/add-recipe' element={<AddRecipe />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/me' element={<>me</>} />
        <Route path='/blog' element={<Blog />} />
      </Routes>
      {
        showSubscribeForm && <Subscribe showSubscribeForm={showSubscribeForm} setShowSubscribeForm={setShowSubscribeForm} />
      }
      <Footer showSubscribeForm={showSubscribeForm} setShowSubscribeForm={setShowSubscribeForm} />
    </div>
  );
}

export default App;
