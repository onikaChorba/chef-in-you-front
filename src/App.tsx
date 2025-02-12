import React, { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { fetchRecipes, fetchTags } from "./redux/slices/recipes";
import { Header } from './components/header/header';
import { Home } from './pages/home/home';
import { Registration } from './components/forms/auth/registration/registration';
import { Login } from './components/forms/auth/login/login';
import { RecipeDetails } from './components/recipe/recipeDetails/recipeDetails';
import { AddRecipe } from './pages/addRecipe/addRecipe';
import { fetchAuthMe } from './redux/slices/auth';
import { Recipes } from './pages/recipes/recipes';
import { Blog } from './pages/blog/blog'
import Footer from './components/footer/footer';
import { Subscribe } from './components/forms/auth/subscribe/subscribe';
import bgImg from './assets/imgs/bg.svg';

function App() {
  const dispatch: AppDispatch = useDispatch();

  const { recipes, tags } = useSelector((state: RootState) => state.recipes);
  const [showSubscribeForm, setShowSubscribeForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegForm, setShowRegForm] = useState(false);

  useEffect(() => {
    dispatch(fetchRecipes());
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchAuthMe());
    }
  }, [dispatch]);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
      <div className='container'>
        <img src={bgImg} className='container__img' alt='bgImg' />
        <Header setShowLoginForm={setShowLoginForm} setShowRegForm={setShowRegForm} />
        <Routes>
          <Route path='/' element={<Home recipes={recipes} tags={tags} setShowLoginForm={setShowLoginForm} setShowRegForm={setShowRegForm} />} />
          <Route path='/recipes' element={<Recipes recipes={recipes} tags={tags} />} />
          <Route path='/recipes/:id' element={<RecipeDetails />} />
          <Route path='/add-recipe' element={<AddRecipe setShowRegForm={setShowRegForm} />} />
          <Route path='/me' element={<>me</>} />
          <Route path='/blog' element={<Blog />} />
        </Routes>
        {
          showLoginForm && <Login showLoginForm={showLoginForm} setShowLoginForm={setShowLoginForm} />
        }
        {
          showRegForm && <Registration showRegForm={showRegForm} setShowRegForm={setShowRegForm} />
        }
        {
          showSubscribeForm && <Subscribe showSubscribeForm={showSubscribeForm} setShowSubscribeForm={setShowSubscribeForm} />
        }
        <Footer showSubscribeForm={showSubscribeForm} setShowSubscribeForm={setShowSubscribeForm} />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
