import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss';
import logo from '../../assets/icons/logo.png';
import { Button } from '../button/button.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth.ts';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  }

  return (
    <header className='header'>
      <div className='header__logo'>
        <img src={logo} alt="logo" />
        <p className='poppins-bold'>Chef in you</p>
      </div>
      <nav className='header__nav poppins-semibold'>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/recipes">Recipes</NavLink>
        {
          isAuth && <NavLink to="/add-recipe">Add Recipe</NavLink>
        }
        <NavLink to="/blog">Blog</NavLink>
      </nav>
      {
        !isAuth ?
          <div className='header__buttons'>
            <NavLink to="/login" className='link'>
              <Button
                text="Login in"
                onClick={() => console.log(1)}
                className="button-secondary poppins-bold" />
            </NavLink>
            <NavLink to="/registration" className='link'>
              <Button
                text="Sing up"
                onClick={() => console.log(2)}
                className="button-primary poppins-bold" />
            </NavLink>
          </div>
          :
          <div>
            <Button
              text="Login out"
              onClick={() => onClickLogout()}
              className="button-primary poppins-bold" />
          </div>
      }
    </header>
  )
}