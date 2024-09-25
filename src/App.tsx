import React from 'react'
import { Route, Routes } from "react-router-dom"
import { Header } from './components/header/header.tsx';
import { Home } from './components/pages/home/home.tsx';
import { Registration } from './components/form/registration/registration.tsx';
import { Login } from './components/form/login/login.tsx';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipes/' element={<>Recipes</>} />
        <Route path='/recipes/:id' element={<>Recipe Details</>} />
        <Route path='/add-recipe' element={<>add-recipe</>} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/blog' element={<>blog</>} />
      </Routes>
    </>
  );
}

export default App;
