import React from 'react';
import './header.scss';
import logo from '../../assets/icons/logo.png';
import { Button } from '../button/button.tsx';

export const Header = () => {
  return (
    <header className='header'>
      <div className='header__logo'>
        <img src={logo} alt="logo" /><p className='poppins-bold'>Chef in you</p>
      </div>
      <nav className='header__nav poppins-semibold'>
        <a href="#">Home</a>
        <a href="#">Recipes</a>
        <a href="#">Add Recipe</a>
        <a href="#">Blog</a>
      </nav>
      <div className='header__buttons'>
        <Button
          text="Login in"
          onClick={() => console.log(1)}
          className="button-secondary" />
        <Button
          text="Sing up"
          onClick={() => console.log(2)}
          className="button-primary" />
      </div>
    </header>
  )
}