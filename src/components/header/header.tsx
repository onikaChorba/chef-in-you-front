import React from 'react';
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import styles from './header.module.scss';
import logo from '../../assets/icons/logo.png';
import { Button } from '../button/button';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

interface IHeader {

}

export const Header: React.FC<IHeader> = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <img src={logo} alt="logo" />
        <p className={styles['poppins-bold']}>Chef in you</p>
      </div>
      <nav className={`${styles.header__nav} ${styles['poppins-semibold']}`}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
        >
          Home
        </NavLink>
        <NavLink to="/recipes" className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>Recipes</NavLink>
        {
          isAuth && <NavLink to="/add-recipe" className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>Add Recipe</NavLink>
        }
        <NavLink to="/blog" className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>Blog</NavLink>
      </nav>
      {
        !isAuth ?
          <div className={styles.header__buttons}>
            <NavLink to="/login" className={styles.link}>
              <Button
                text="Login in"
                textStyle="poppins-bold"
                buttonStyle="button-secondary"
                onClick={() => navigate("/login")} />
            </NavLink>
            <NavLink to="/registration" className={styles.link}>
              <Button
                text="Sing up"
                textStyle="poppins-bold"
                onClick={() => navigate("/registration")}
              />
            </NavLink>
          </div>
          :
          <div>
            <Button
              text="Login out"
              onClick={() => onClickLogout()}
              textStyle="poppins-bold" />
          </div>
      }
    </header>
  )
}