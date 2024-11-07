import React, { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Header } from './components/header/header';
import { Home } from './components/pages/home/home';
import { Registration } from './components/form/registration/registration';
import { Login } from './components/form/login/login';
import { RecipeDetails } from './components/recipe/recipe';
import { AddRecipe } from './components/pages/recipes/addRecipe';
import { fetchAuthMe } from './redux/slices/auth';
import { AppDispatch } from './redux/store';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegForm, setShowRegForm] = useState(false);

  useEffect(() => {
    dispatch(fetchAuthMe())
  })

  return (
    <div className='container'>
      <Header setShowLoginForm={setShowLoginForm} setShowRegForm={setShowRegForm} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipes' element={<>Recipes</>} />
        <Route path='/recipes/tags' element={<>tags</>} />
        <Route path='/recipes/:id' element={<RecipeDetails />} />
        <Route path='/add-recipe' element={<AddRecipe />} />
        <Route path='/login' element={showLoginForm && <Login setShowLoginForm={setShowLoginForm} />} />
        <Route path='/registration' element={showRegForm && <Registration setShowRegForm={setShowRegForm} />} />
        <Route path='/me' element={<>me</>} />
        <Route path='/blog' element={<>blog</>} />
      </Routes>
    </div>
  );
}

export default App;
