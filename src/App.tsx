import React, { useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './components/header/header.tsx';
import { Home } from './components/pages/home/home.tsx';
import { Registration } from './components/form/registration/registration.tsx';
import { Login } from './components/form/login/login.tsx';
import { RecipeDetails } from './components/recipe/recipe.tsx';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth.ts';
import { AppDispatch } from './redux/store.ts';
import { AddRecipe } from './components/pages/recipes/addRecipe.tsx';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  });

  return (
    <>
      <Header />
      {isAuth}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipes' element={<>Recipes</>} />
        <Route path='/recipes/tags' element={<>tags</>} />
        <Route path='/recipes/:id' element={<RecipeDetails />} />
        <Route path='/add-recipe' element={<AddRecipe />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/me' element={<>me</>} />
        <Route path='/blog' element={<>blog</>} />
      </Routes>
    </>
  );
}

export default App;
