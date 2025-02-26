import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.scss';
import Images from '../../images';
import { Button } from '../button/button';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';
interface IHeader {
  setShowLoginForm: (showLoginForm: boolean) => void;
  setShowRegForm: (showRegForm: boolean) => void;
}

export const Header: React.FC<IHeader> = ({ setShowLoginForm, setShowRegForm }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  }
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <img src={Images.logo} alt="logo" />
        <p className={styles['poppins-bold']}>Chef in you</p>
      </div>
      {!menuOpen && <div className={styles.menuIcon} onClick={toggleMenu}>
        <img src={Images.menu} alt="menu" width={28} />
      </div>}
      <div className={`${styles.header__navbar} ${menuOpen ? styles.open : ''}`}>
        <div className={styles.closeIcon} onClick={toggleMenu}>
          <img src={Images.close} alt="close" width={28} />
        </div>
        <nav className={`${styles.header__nav} ${styles['poppins-semibold']} ${menuOpen ? styles.open : ''}`}>
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
            <div className={`${styles.header__buttons}  ${menuOpen ? styles.open : ''}`}>
              <Button
                text="Login in"
                textStyle="poppins-bold"
                buttonStyle="button-secondary"
                onClick={() => setShowLoginForm(true)} />

              <Button
                text="Sing up"
                textStyle="poppins-bold"
                onClick={() => setShowRegForm(true)}
              />
            </div>
            :
            <div>
              <Button
                text="Login out"
                onClick={() => onClickLogout()}
                textStyle="poppins-bold" />
            </div>
        }
      </div>
    </header>
  )
}