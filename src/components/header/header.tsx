import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/">Home</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/add-recipe">Add Recipe</Link>
        <Link to="/blog">Blog</Link>
      </nav>
      <div className='header__buttons'>
        <Link to="/login" className='link'>
          <Button
            text="Login in"
            onClick={() => console.log(1)}
            className="button-secondary poppins-bold" />
        </Link>
        <Link to="/registration" className='link'>
          <Button
            text="Sing up"
            onClick={() => console.log(2)}
            className="button-primary poppins-bold" />
        </Link>
      </div>
    </header>
  )
}